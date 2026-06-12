// screens/FavoritesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const FavoritesScreen = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [favorites, setFavorites] = useState([]);
  const [newSite, setNewSite] = useState({ name: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Tracks if we are editing an existing item
  const navigation = useNavigation();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setCurrentUser(u);
      if (!u) {
        // Clear favorites from state when user logs out
        setFavorites([]);
      }
    });
    return unsubscribe;
  }, []);

  // Load favorites from Firestore on mount/user change
  useEffect(() => {
    if (currentUser) {
      const loadFavorites = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().favorites) {
            setFavorites(docSnap.data().favorites);
          }
        } catch (e) {
          console.error("Favoriler yüklenirken hata oluştu:", e);
        }
      };
      loadFavorites();
    }
  }, [currentUser]);

  const saveFavorite = async () => {
    if (!newSite.name || !newSite.url) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    let formattedUrl = newSite.url;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    let updated;
    if (editingIndex !== null) {
      // Editing Mode
      updated = [...favorites];
      updated[editingIndex] = { name: newSite.name, url: formattedUrl };
    } else {
      // Adding Mode
      updated = [...favorites, { name: newSite.name, url: formattedUrl }];
    }

    setFavorites(updated);
    setNewSite({ name: '', url: '' });
    setEditingIndex(null);
    setIsAdding(false);

    if (currentUser) {
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        await setDoc(docRef, { favorites: updated }, { merge: true });
        Alert.alert('Başarılı', editingIndex !== null ? 'Haber sitesi güncellendi.' : 'Haber sitesi favorilere eklendi.');
      } catch (e) {
        Alert.alert('Hata', 'Veri kaydedilemedi: ' + e.message);
      }
    } else {
      Alert.alert('Bilgi', 'Oturum açmadığınız için favoriler yerel olarak güncellendi.');
    }
  };

  const startEdit = (index) => {
    setNewSite({ name: favorites[index].name, url: favorites[index].url });
    setEditingIndex(index);
    setIsAdding(true);
  };

  const deleteFavorite = async (indexToDelete) => {
    Alert.alert(
      'Favoriyi Sil',
      'Bu siteyi favorilerinizden kaldırmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const updated = favorites.filter((_, index) => index !== indexToDelete);
            setFavorites(updated);
            if (currentUser) {
              try {
                const docRef = doc(db, 'users', currentUser.uid);
                await setDoc(docRef, { favorites: updated }, { merge: true });
              } catch (e) {
                Alert.alert('Hata', 'Favori silinemedi: ' + e.message);
              }
            }
          }
        }
      ]
    );
  };

  const handleOpenURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Hata', 'Bu link açılamıyor: ' + url);
      }
    } catch (e) {
      Alert.alert('Hata', e.message);
    }
  };

  // Add/Edit Favorite Screen State
  if (isAdding) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { setIsAdding(false); setEditingIndex(null); navigation.navigate('HomeScreen'); }} style={styles.headerButton}>
            <Image source={require('../assets/home.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setIsAdding(true); setEditingIndex(null); }} style={styles.headerButton}>
            <Image source={require('../assets/add.png')} style={[styles.icon, styles.activeIcon]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserSettingsScreen')} style={styles.headerButton}>
            <Image source={require('../assets/user.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { setIsAdding(false); setEditingIndex(null); }} style={styles.backButton}>
          <Text style={styles.backButtonText}>〈</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.label}>{editingIndex !== null ? 'Haber Sitesini Düzenle' : 'Haber Sitesi Başlığı'}</Text>
          <TextInput
            placeholder="Haber Sitesi Başlığı"
            value={newSite.name}
            onChangeText={(text) => setNewSite({ ...newSite, name: text })}
            style={styles.input}
            placeholderTextColor="#AAA"
          />

          <Text style={styles.label}>Haber Sitesi Linki</Text>
          <TextInput
            placeholder="Haber Sitesi Linki"
            value={newSite.url}
            onChangeText={(text) => setNewSite({ ...newSite, url: text })}
            style={styles.input}
            placeholderTextColor="#AAA"
            autoCapitalize="none"
            keyboardType="url"
          />

          <View style={styles.submitButtonRow}>
            <TouchableOpacity style={styles.submitButton} onPress={saveFavorite}>
              <Text style={styles.submitButtonText}>{editingIndex !== null ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Favorites List Screen State
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.headerButton}>
          <Image source={require('../assets/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIsAdding(true); setEditingIndex(null); setNewSite({ name: '', url: '' }); }} style={styles.headerButton}>
          <Image source={require('../assets/add.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSettingsScreen')} style={styles.headerButton}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownTitleContainer}>
        <View style={styles.dropdownTitleRow}>
          <Text style={styles.dropdownTitle}>⭐️ Favori Haber Sitelerim</Text>
          <Text style={styles.dropdownChevron}>▼</Text>
        </View>
        <View style={styles.dropdownLine} />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.favoriteItemWrapper}>
            <TouchableOpacity onPress={() => handleOpenURL(item.url)} style={styles.favoriteItemContainer}>
              <Text style={styles.favoriteItemText}>⭐  {item.name}</Text>
              <Text style={styles.favoriteItemUrl}>{item.url}</Text>
            </TouchableOpacity>
            
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity onPress={() => startEdit(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteFavorite(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz favori haber siteniz yok. + butonuna basarak ekleyebilirsiniz.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#5473A3',
  },
  activeIcon: {
    tintColor: '#2F4F7F',
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
  },
  submitButtonRow: {
    alignItems: 'flex-end',
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: '#5473A3',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  dropdownTitleContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  dropdownTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownChevron: {
    fontSize: 14,
    color: '#000',
  },
  dropdownLine: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  favoriteItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  favoriteItemContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  favoriteItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  favoriteItemUrl: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    paddingLeft: 24,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
    marginLeft: 6,
  },
  actionButtonText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 15,
  },
});

export default FavoritesScreen;

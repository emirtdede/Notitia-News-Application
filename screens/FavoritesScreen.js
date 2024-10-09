// screens/FavoritesScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [newSite, setNewSite] = useState({ name: '', url: '' });
  const navigation = useNavigation();

  const addFavorite = () => {
    setFavorites([...favorites, newSite]);
    setNewSite({ name: '', url: '' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={addFavorite}>
          <Image source={require('../assets/add.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSettingsScreen')}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.favoriteItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        placeholder="Site Adı"
        value={newSite.name}
        onChangeText={(text) => setNewSite({ ...newSite, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Site URL"
        value={newSite.url}
        onChangeText={(text) => setNewSite({ ...newSite, url: text })}
        style={styles.input}
      />
      <Button title="Favori Ekle" onPress={addFavorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  favoriteItem: {
    padding: 8,
    fontSize: 16,
  },
});

export default FavoritesScreen;

// screens/UserSettingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const countriesList = [
  'Türkiye', 'United States', 'United Kingdom', 'Germany', 'France',
  'Italy', 'Spain', 'Japan', 'Canada', 'Australia', 'Netherlands', 'Brazil'
];

const UserSettingsScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');

  // Modals visibility states
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isDobModalVisible, setIsDobModalVisible] = useState(false);

  // DOB temp fields
  const [tempDay, setTempDay] = useState('');
  const [tempMonth, setTempMonth] = useState('');
  const [tempYear, setTempYear] = useState('');

  // Listen to auth state changes to ensure user is loaded correctly
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setCurrentUser(u);
      if (u) {
        setDisplayName(u.displayName || '');
        setEmail(u.email || '');
      }
    });
    return unsubscribe;
  }, []);

  // Load profile details from Firestore when currentUser is ready
  useEffect(() => {
    if (currentUser) {
      const loadProfile = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.dob) {
              setDob(data.dob);
              const parts = data.dob.split('/');
              if (parts.length === 3) {
                setTempDay(parts[0]);
                setTempMonth(parts[1]);
                setTempYear(parts[2]);
              }
            }
            if (data.country) setCountry(data.country);
            if (data.displayName) setDisplayName(data.displayName);
          }
        } catch (e) {
          console.error("Profil yükleme hatası:", e);
        }
      };
      loadProfile();
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      try {
        // Update display name in Auth
        await updateProfile(currentUser, { displayName });
        
        // Save dob & country in Firestore
        const docRef = doc(db, 'users', currentUser.uid);
        await setDoc(docRef, {
          displayName,
          dob,
          country
        }, { merge: true });

        Alert.alert('Başarılı', 'Profil bilgileriniz başarıyla kaydedildi.');
      } catch (error) {
        Alert.alert('Hata', error.message);
      }
    } else {
      Alert.alert('Hata', 'Oturum açık değil.');
    }
  };

  const handleConfirmDob = () => {
    if (!tempDay || !tempMonth || !tempYear) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    const formattedDob = `${tempDay.padStart(2, '0')}/${tempMonth.padStart(2, '0')}/${tempYear}`;
    setDob(formattedDob);
    setIsDobModalVisible(false);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('LoginScreen');
      })
      .catch((error) => {
        Alert.alert('Hata', error.message);
      });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>〈</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Image source={require('../assets/user.png')} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Cute Blue Glasses Character Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.glassesLogo}>
          <View style={styles.eyeOuter}>
            <View style={styles.eyeInner}>
              <View style={styles.pupil} />
            </View>
          </View>
          <View style={styles.glassesBridge} />
          <View style={styles.eyeOuter}>
            <View style={styles.eyeInner}>
              <View style={styles.pupil} />
            </View>
          </View>
        </View>
        <View style={styles.legsContainer}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Your Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email@example.com"
          value={email}
          style={[styles.input, styles.disabledInput]}
          placeholderTextColor="#999"
          editable={false}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setIsDobModalVisible(true)}>
          <Text style={dob ? styles.dropdownValue : styles.dropdownPlaceholder}>{dob || 'DD/MM/YYYY'}</Text>
          <Text style={styles.dropdownChevron}>▼</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Country/Region</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setIsCountryModalVisible(true)}>
          <Text style={country ? styles.dropdownValue : styles.dropdownPlaceholder}>{country || 'Select a Country/Region'}</Text>
          <Text style={styles.dropdownChevron}>▼</Text>
        </TouchableOpacity>

        {/* Buttons Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.changePasswordButton} 
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={styles.buttonText}>Change{"\n"}Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date of Birth Picker Modal */}
      <Modal transparent visible={isDobModalVisible} animationType="fade" onRequestClose={() => setIsDobModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Doğum Tarihi Girin</Text>
            <View style={styles.dobInputRow}>
              <TextInput 
                placeholder="DD" 
                value={tempDay} 
                onChangeText={setTempDay} 
                maxLength={2} 
                keyboardType="numeric" 
                style={styles.dobInput} 
              />
              <Text style={styles.dobSlash}>/</Text>
              <TextInput 
                placeholder="MM" 
                value={tempMonth} 
                onChangeText={setTempMonth} 
                maxLength={2} 
                keyboardType="numeric" 
                style={styles.dobInput} 
              />
              <Text style={styles.dobSlash}>/</Text>
              <TextInput 
                placeholder="YYYY" 
                value={tempYear} 
                onChangeText={setTempYear} 
                maxLength={4} 
                keyboardType="numeric" 
                style={[styles.dobInput, { width: 70 }]} 
              />
            </View>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancelBtn]} onPress={() => setIsDobModalVisible(false)}>
                <Text style={styles.modalCancelBtnText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalSaveBtn]} onPress={handleConfirmDob}>
                <Text style={styles.modalSaveBtnText}>Seç</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Country Selection Modal */}
      <Modal transparent visible={isCountryModalVisible} animationType="slide" onRequestClose={() => setIsCountryModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: 400 }]}>
            <Text style={styles.modalTitle}>Ülke Seçin</Text>
            <FlatList
              data={countriesList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.countrySelectItem} 
                  onPress={() => { setCountry(item); setIsCountryModalVisible(false); }}
                >
                  <Text style={styles.countrySelectText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseLink} onPress={() => setIsCountryModalVisible(false)}>
              <Text style={styles.modalCloseLinkText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  logoutButton: {
    alignItems: 'center',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: '#9B5A5A',
  },
  logoutText: {
    fontSize: 12,
    color: '#9B5A5A',
    fontWeight: '600',
    marginTop: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  glassesLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeOuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#7FA7F5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eyeInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pupil: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  glassesBridge: {
    width: 12,
    height: 6,
    backgroundColor: '#7FA7F5',
  },
  legsContainer: {
    flexDirection: 'row',
    width: 48,
    justifyContent: 'space-between',
    marginTop: 2,
  },
  leg: {
    width: 4,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  formContainer: {
    marginTop: 10,
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
  disabledInput: {
    backgroundColor: '#F8F8F8',
    color: '#777',
  },
  dropdownField: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#999',
  },
  dropdownValue: {
    fontSize: 15,
    color: '#333',
  },
  dropdownChevron: {
    fontSize: 12,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  changePasswordButton: {
    backgroundColor: '#9B5A5A',
    paddingVertical: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#5473A3',
    paddingVertical: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  dobInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dobInput: {
    borderBottomWidth: 1.5,
    borderColor: '#7FA7F5',
    fontSize: 18,
    textAlign: 'center',
    width: 40,
    paddingVertical: 4,
  },
  dobSlash: {
    fontSize: 20,
    marginHorizontal: 8,
    color: '#777',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    paddingVertical: 12,
    width: '45%',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalCancelBtn: {
    backgroundColor: '#F3F4F6',
  },
  modalCancelBtnText: {
    color: '#666',
    fontWeight: '600',
  },
  modalSaveBtn: {
    backgroundColor: '#5473A3',
  },
  modalSaveBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  countrySelectItem: {
    width: '100%',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  countrySelectText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseLink: {
    marginTop: 16,
    padding: 8,
  },
  modalCloseLinkText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UserSettingsScreen;

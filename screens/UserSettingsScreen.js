// screens/UserSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const UserSettingsScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleSave = () => {
    if (user) {
      updateProfile(user, { displayName })
        .then(() => {
          console.log('Profil güncellendi');
        })
        .catch((error) => {
          console.error('Profil güncelleme hatası:', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="İsim"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        editable={false}
      />
      <Button title="Kaydet" onPress={handleSave} />
      <Button title="Şifre Değiştir" onPress={() => navigation.navigate('ChangePasswordScreen')} />
      <Button title="Çıkış Yap" onPress={() => auth.signOut().then(() => navigation.replace('LoginScreen'))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default UserSettingsScreen;

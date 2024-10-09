// screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert('Şifreler uyuşmuyor');
      return;
    }

    const user = auth.currentUser;

    if (user) {
      updatePassword(user, password)
        .then(() => {
          console.log('Şifre güncellendi');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Şifre güncelleme hatası:', error.message);
        });
    } else {
      alert('Kullanıcı oturumu açık değil');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Yeni Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Yeni Şifre (Tekrar)"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Şifreyi Değiştir" onPress={handleChangePassword} />
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

export default ChangePasswordScreen;

// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1087137037590-p4pphli38ol0qa6ieoeko25r0bq0k5a7.apps.googleusercontent.com',
    redirectUri: Linking.createURL("/"),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log('Google ile giriş yapıldı:', result.user.email);
          navigation.replace('HomeScreen');
        })
        .catch((error) => {
          console.error('Google giriş hatası:', error.message);
        });
    } else if (response?.type === 'error') {
      console.error('Google auth error:', response.error);
    }
  }, [response]);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Kullanıcı oluşturuldu:', user.email);
      })
      .catch((error) => {
        console.error('Hata:', error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Kullanıcı girişi yapıldı:', user.email);
        navigation.replace('HomeScreen');
      })
      .catch((error) => {
        console.error('Hata:', error.message);
      });
  };

  return (
    <View style={styles.center}>
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Kayıt Ol" onPress={handleSignUp} />
      <Button title="Giriş Yap" onPress={handleSignIn} />
      <TouchableOpacity disabled={!request} onPress={() => promptAsync()} style={styles.googleButton}>
        <Image source={require('../assets/google.png')} style={styles.googleImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('HomeScreen')}>
        <Text style={styles.link}>Go to the NEWS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  googleButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  googleImage: {
    width: 52,
    height: 52,
  },
  link: {
    marginTop: 16,
    color: 'blue',
  },
});

export default LoginScreen;

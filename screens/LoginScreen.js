// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
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
          Alert.alert('Google Giriş Hatası', error.message);
        });
    } else if (response?.type === 'error') {
      console.error('Google auth error:', response.error);
    }
  }, [response]);

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre giriniz.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Kullanıcı oluşturuldu:', user.email);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error('Hata:', error.message);
        Alert.alert('Kayıt Hatası', error.message);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre giriniz.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Kullanıcı girişi yapıldı:', user.email);
        navigation.replace('HomeScreen');
      })
      .catch((error) => {
        console.error('Hata:', error.message);
        Alert.alert('Giriş Hatası', error.message);
      });
  };

  // Success Screen State (Screenshot 5)
  if (isSuccess) {
    return (
      <View style={styles.center}>
        <View style={styles.badgeWrapper}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>
        </View>
        <Text style={styles.successText}>Account created successfully!</Text>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            setIsSuccess(false);
            setIsSignUpMode(false);
            setEmail('');
            setPassword('');
          }}
        >
          <Text style={styles.primaryButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Login & Sign Up Screen State (Screenshot 4)
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Notitia</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={isSignUpMode ? handleSignUp : handleSignIn}
        >
          <Text style={styles.primaryButtonText}>{isSignUpMode ? 'Sign up' : 'Sign in'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or social login</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity 
        disabled={!request} 
        onPress={() => promptAsync()} 
        style={styles.googleButton}
      >
        <Image source={require('../assets/google.png')} style={styles.googleImage} />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {isSignUpMode ? 'Already have an account? ' : "Don't you have an account? "}
        </Text>
        <TouchableOpacity onPress={() => setIsSignUpMode(!isSignUpMode)}>
          <Text style={styles.footerLink}>{isSignUpMode ? 'Sign in' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or continue without account</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity onPress={() => navigation.replace('HomeScreen')}>
        <Text style={styles.newsLink}>Go to the NEWS</Text>
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
    padding: 24,
  },
  title: {
    fontSize: 56,
    fontWeight: '200',
    fontFamily: 'sans-serif-light',
    color: '#333',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1.5,
    borderColor: '#7FA7F5', // Thin blue outline
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#5473A3', // Blueish-purple pill button
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#777',
    fontSize: 13,
  },
  googleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  googleImage: {
    width: 28,
    height: 28,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#333',
    fontSize: 14,
  },
  footerLink: {
    color: '#5473A3',
    fontSize: 14,
    fontWeight: '600',
  },
  newsLink: {
    color: '#5473A3',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  // Success Screen Styles
  badgeWrapper: {
    marginBottom: 30,
  },
  badgeOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    // Scalloped badge look via border styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  checkmark: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default LoginScreen;

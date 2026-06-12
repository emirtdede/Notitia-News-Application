// screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler uyuşmuyor.');
      return;
    }

    const user = auth.currentUser;

    if (user && user.email) {
      // Reauthenticate user before changing password (best practice for security)
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi.');
              navigation.goBack();
            })
            .catch((error) => {
              Alert.alert('Şifre Güncelleme Hatası', error.message);
            });
        })
        .catch((error) => {
          Alert.alert('Kimlik Doğrulama Hatası', 'Eski şifreniz yanlış.');
        });
    } else {
      Alert.alert('Hata', 'Kullanıcı oturumu açık değil.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Header Row with back button */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>〈</Text>
        </TouchableOpacity>
      </View>

      {/* Cute Blue Glasses Character Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.glassesLogo}>
          {/* Left Eye */}
          <View style={styles.eyeOuter}>
            <View style={styles.eyeInner}>
              <View style={styles.pupil} />
            </View>
          </View>
          {/* Glasses Bridge */}
          <View style={styles.glassesBridge} />
          {/* Right Eye */}
          <View style={styles.eyeOuter}>
            <View style={styles.eyeInner}>
              <View style={styles.pupil} />
            </View>
          </View>
        </View>
        {/* Little Legs */}
        <View style={styles.legsContainer}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Old Password Section */}
        <View style={styles.sectionHeaderContainer}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>Old Password</Text>
          <View style={styles.sectionLine} />
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="************"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#AAA"
          autoCapitalize="none"
        />

        {/* New Password Section */}
        <View style={styles.sectionHeaderContainer}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>New Password</Text>
          <View style={styles.sectionLine} />
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="************"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#AAA"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="************"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#AAA"
          autoCapitalize="none"
        />

        {/* Submit button aligned to the right */}
        <View style={styles.submitButtonRow}>
          <TouchableOpacity style={styles.submitButton} onPress={handleChangePassword}>
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  // Custom drawn logo styles
  logoContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 24,
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
  // Form styles
  formContainer: {
    width: '100%',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    marginHorizontal: 10,
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
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
    marginBottom: 16,
  },
  submitButtonRow: {
    alignItems: 'flex-end',
    marginTop: 16,
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
});

export default ChangePasswordScreen;

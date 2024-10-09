// screens/InfoScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>~ Mail Adresiniz ile kaydolabilir,</Text>
        <Text>~ Google hesabınızla kolayca giriş yapabilir,</Text>
        <Text>~ Hesap açmadan, anında uygulamayı kullanmaya başlayabilirsiniz.</Text>
        <Text>~ Notitia’nın amacı ilgili haber kategorilerindeki haber sitelerine hızlıca ve kolayca ulaşabilmenizi sağlamaktır.</Text>
        <Text>~ Kullanıcı Profilinizde değişiklikler yapar bilgilerinizi güncellemenize olanak sağlar.</Text>
        <Text>~ Şifrenizi Değiştirmenize olanak sağlayarak güvenliğinizi daima sağlam tutmanıza yardımcı olur.</Text>
      </ScrollView>
      <Button title="Geri" onPress={() => navigation.goBack()} />
      <Button title="İleri" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
});

export default InfoScreen;

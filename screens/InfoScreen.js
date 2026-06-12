// screens/InfoScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Notitia</Text>
        <Text style={styles.subtitle}>Hakkında</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>~ Mail Adresiniz ile kaydolabilir,</Text>
          <Text style={styles.listItem}>~ Google hesabınızla kolayca giriş yapabilir,</Text>
          <Text style={styles.listItem}>~ Hesap açmadan,{"\n"}  anında uygulamayı kullanmaya başlayabilirsiniz.</Text>
          <Text style={styles.listItem}>~ Notitia’nın amacı ilgili haber kategorilerindeki haber sitelerine hızlıca ve kolayca ulaşabilmenizi sağlamaktır.</Text>
          <Text style={styles.listItem}>~ Kullanıcı Profilinizde değişiklikler yapar bilgilerinizi güncellemenize olanak sağlar.</Text>
          <Text style={styles.listItem}>~ Şifrenizi Değiştirmenize olanak sağlayarak güvenliğinizi daima sağlam tutmanıza yardımcı olur.</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 56,
    fontWeight: '200',
    fontFamily: 'sans-serif-light',
    color: '#333',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '200',
    fontFamily: 'sans-serif-light',
    color: '#777',
    marginTop: -5,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '300',
    fontFamily: 'sans-serif',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#34A853',
    paddingVertical: 12,
    width: '45%',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InfoScreen;

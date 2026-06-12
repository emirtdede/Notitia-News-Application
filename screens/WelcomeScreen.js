// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InfoScreen')}>
        <Text style={styles.buttonText}>İleri</Text>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '200',
    fontFamily: 'sans-serif-light',
    color: '#333',
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#34A853',
    paddingVertical: 12,
    paddingHorizontal: 60,
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

export default WelcomeScreen;

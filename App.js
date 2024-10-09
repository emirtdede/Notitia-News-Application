// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import InfoScreen from './screens/InfoScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import UserSettingsScreen from './screens/UserSettingsScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'Hoşgeldiniz' }} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'Hakkında' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favori Haber Sitelerim' }} />
        <Stack.Screen name="UserSettingsScreen" component={UserSettingsScreen} options={{ title: 'Kullanıcı Ayarları' }} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Şifre Değiştir' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

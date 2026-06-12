// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('WelcomeScreen');
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.center}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Notitia
      </Animated.Text>
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
  title: {
    fontSize: 56,
    fontWeight: '200',
    fontFamily: 'sans-serif-light',
    color: '#333',
    letterSpacing: 2,
  },
});

export default SplashScreen;

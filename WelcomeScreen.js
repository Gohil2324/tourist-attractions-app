import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // 💡 Import theme hook

export default function WelcomeScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme(); // 💡 Access theme and toggle

  return (
    <ImageBackground
      source={{
        uri: 'https://as1.ftcdn.net/v2/jpg/10/78/54/62/1000_F_1078546204_7qTZuyZhNVWwOhnufZpC24VLcG6ciEMC.jpg',
      }}
      style={styles.background}
    >
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        {/* Floating Login Button */}
        <TouchableOpacity style={[styles.floatingLogin, { backgroundColor: theme.primary }]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.floatingLoginText}>🔐</Text>
          <Text style={styles.floatingLoginLabel}>Login</Text>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity style={styles.toggle} onPress={toggleTheme}>
          <Text style={[styles.toggleText, { color: theme.primary }]}>
            {theme.mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>🌍 Explore London</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Discover the best attractions in the city</Text>

        {/* Welcome Languages */}
        <View style={styles.languageBox}>
          {['🇬🇧 Welcome', '🇫🇷 Bienvenue', '🇪🇸 Bienvenido', '🇨🇳 欢迎', '🇸🇦 مرحبا', '🇩🇪 Willkommen', '🇮🇳 स्वागत है', '🇯🇵 ようこそ', '🇷🇺 Добро пожаловать'].map((greet, i) => (
            <Text key={i} style={styles.lang}>{greet}</Text>
          ))}
        </View>

        {/* View Attractions Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('Attractions')}
        >
          <Text style={styles.buttonText}>View Attractions ➡️</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingLogin: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingLoginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  floatingLoginLabel: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  toggle: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  languageBox: {
    marginBottom: 30,
    alignItems: 'center',
  },
  lang: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

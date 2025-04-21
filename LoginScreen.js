import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!email || !password || (isSignup && (!name || !repeatPassword))) {
      Alert.alert('Please fill all fields');
      return;
    }

    if (isSignup && password !== repeatPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (isSignup) {
      navigation.navigate('Subscribe', { name });
    } else {
      Alert.alert('Login Success', `Welcome back ${email}`);
      navigation.navigate('Attractions');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSignup ? 'Sign Up' : 'Login'}</Text>

      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          onChangeText={setName}
          value={name}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setRepeatPassword}
          value={repeatPassword}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E', padding: 20, justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold', color: '#000' },
  switchText: { textAlign: 'center', color: '#FFD700', marginTop: 10 },
});

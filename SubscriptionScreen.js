import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const plans = [
  { id: 'basic', name: 'Basic', price: '£4.99', features: ['Access to main attractions'] },
  { id: 'pro', name: 'Pro', price: '£9.99', features: ['Food suggestions', 'Offline maps'] },
  { id: 'premium', name: 'Premium', price: '£14.99', features: ['Pro features', 'Early access to events'] },
  { id: 'free', name: 'Free Trial (2 Months)', price: '£0.00', features: ['Limited access', 'Valid for 2 months'] },
];

export default function SubscriptionScreen({ route, navigation }) {
  const [selected, setSelected] = useState('basic');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const subscribe = () => {
    // If user selects free trial, skip card inputs
    if (selected === 'free') {
      Alert.alert('Welcome!', 'You are now on a 2-month free trial.');
      navigation.navigate('Attractions');
      return;
    }

    // For paid plans, validate card details
    if (!cardName || !cardNumber) {
      Alert.alert('Card Info Needed', 'Please enter your card details.');
      return;
    }

    Alert.alert('Subscription Successful', `You're subscribed to the ${selected.toUpperCase()} plan!`);
    navigation.navigate('Attractions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subscription Plans</Text>
      <Text style={styles.subText}>Welcome {route.params?.name || 'User'}</Text>

      {selected !== 'free' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            placeholderTextColor="#999"
            onChangeText={setCardName}
            value={cardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            onChangeText={setCardNumber}
            value={cardNumber}
          />
        </>
      )}

      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={[styles.plan, selected === plan.id && styles.selected]}
          onPress={() => setSelected(plan.id)}
        >
          <Text style={styles.planName}>{plan.name} - {plan.price}</Text>
          {plan.features.map((f, i) => (
            <Text key={i} style={styles.feature}>• {f}</Text>
          ))}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.subscribeButton} onPress={subscribe}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  subText: { fontSize: 16, color: '#ccc', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  plan: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#555',
  },
  selected: {
    borderColor: '#FFD700',
    backgroundColor: '#2D2D2D',
  },
  planName: { fontWeight: 'bold', fontSize: 16, color: '#FFD700', marginBottom: 5 },
  feature: { color: '#ccc', fontSize: 14 },
  subscribeButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 16 },
});

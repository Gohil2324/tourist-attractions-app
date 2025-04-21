import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import AttractionsListScreen from '../screens/AttractionsListScreen';
import VisitPlanScreen from '../screens/VisitPlanScreen';
import WeatherScreen from '../screens/WeatherScreen';
import { Button, Alert, BackHandler } from 'react-native';

const Stack = createStackNavigator();

const exitApp = () => {
  Alert.alert('Exit App', 'Are you sure you want to exit?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Exit', onPress: () => BackHandler.exitApp() },
  ]);
};

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#1E1E1E' },
        headerTintColor: '#FFD700',
        headerTitleStyle: { fontWeight: 'bold' },
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: 'Home',
          headerRight: () => (
            <Button title="❌ Exit" color="red" onPress={exitApp} />
          ),
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Subscribe" component={SubscriptionScreen} />
      <Stack.Screen name="Attractions" component={AttractionsListScreen} />
      <Stack.Screen name="Visit Plan" component={VisitPlanScreen} />
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>
  );
}

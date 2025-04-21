import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Button, Alert, BackHandler } from 'react-native';

// Theme
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import AttractionsListScreen from './screens/AttractionsListScreen';
import VisitPlanScreen from './screens/VisitPlanScreen';
import WeatherScreen from './screens/WeatherScreen'; // Import the WeatherScreen

const Stack = createStackNavigator();

const exitApp = () => {
  Alert.alert('Exit App', 'Are you sure you want to exit?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Exit', onPress: () => BackHandler.exitApp() },
  ]);
};

function AppNavigator() {
  const { theme } = useTheme(); // Access current theme

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.primary,
          headerTitleStyle: { fontWeight: 'bold' },
          animationEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="⬅️ Back"
                color={theme.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Subscribe"
          component={SubscriptionScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="⬅️ Back"
                color={theme.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Attractions"
          component={AttractionsListScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="⬅️ Back"
                color={theme.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Visit Plan"
          component={VisitPlanScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="⬅️ Back"
                color={theme.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={({ navigation }) => ({
            title: 'Weather',
            headerLeft: () => (
              <Button
                title="⬅️ Back"
                color={theme.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

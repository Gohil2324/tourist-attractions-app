// components/Weather.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '840bd76baf89a471e7c5644f17edb125'; // Replace with your actual API key
  const CITY = 'London';
  const COUNTRY = 'GB';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  if (!weatherData) {
    return <Text style={styles.errorText}>Unable to fetch weather data.</Text>;
  }

  const { main, weather, name } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.temperature}>{Math.round(main.temp)}°C</Text>
      <Text style={styles.description}>{weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 18,
    color: '#CCCCCC',
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Weather;

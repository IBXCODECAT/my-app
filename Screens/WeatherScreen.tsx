import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMetar, getTaf } from '../Services/WeatherService'; // Assuming you've created this service
import { RootStackParamList } from '../Types/Types';  // Import the RootStackParamList type
import { RouteProp } from '@react-navigation/native';  // Import RouteProp to define types for route

// Update the type for route.params
type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

const WeatherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<WeatherScreenRouteProp>();  // Specify the correct route type
  const { icao } = route.params;  // ICAO code passed from the HomeScreen

  const [metar, setMetar] = useState<string | null>(null);
  const [taf, setTaf] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const metarData = await getMetar(icao);
        const tafData = await getTaf(icao);
        setMetar(metarData);
        setTaf(tafData);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [icao]);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} color="#0055A4" />

      <Text style={styles.title}>Weather for {icao}</Text>

      {loading && <ActivityIndicator size="large" color="#0055A4" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <ScrollView style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>METAR</Text>
          <Text style={styles.weatherData}>{metar}</Text>

          <Text style={styles.weatherTitle}>TAF</Text>
          <Text style={styles.weatherData}>{taf}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  weatherContainer: {
    width: '100%',
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#002244',
  },
  weatherData: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default WeatherScreen;

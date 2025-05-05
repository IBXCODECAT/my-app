import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMetar, getTaf } from '../Services/WeatherService';
import { RootStackParamList } from '../Types/Types';
import { RouteProp } from '@react-navigation/native';

import MetarWidget from '../Components/MetarWidget';
import BannerWidget from '../Components/BannerWidget'; // New import

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

const extractVisibilityAndClouds = (metar: string) => {
  const visMatch = metar.match(/ (\d{1,2})SM/) || metar.match(/ (\d{4}) /);
  const visibility = visMatch ? (visMatch[1].length === 4 ? `${visMatch[1]}m` : `${visMatch[1]}SM`) : 'N/A';

  const cloudRegex = /(FEW|SCT|BKN|OVC)(\d{3})/g;
  const clouds = [];
  let match;
  while ((match = cloudRegex.exec(metar)) !== null) {
    clouds.push({
      type: match[1],
      altitude: `${parseInt(match[2]) * 100} ft`,
    });
  }

  return { visibility, clouds };
};

const WeatherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<WeatherScreenRouteProp>();
  const { icao } = route.params;

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

  const { visibility, clouds } = metar ? extractVisibilityAndClouds(metar) : { visibility: '0SM', clouds: [] };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Weather for {icao}</Text>

      {loading && <ActivityIndicator size="large" color="#0055A4" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <ScrollView style={styles.weatherContainer}>

          <Text style={styles.weatherTitle}>METAR</Text>
          {metar && <MetarWidget metar={metar} />}

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

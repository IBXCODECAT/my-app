import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMetar, getTaf } from '../Services/WeatherService';
import { RootStackParamList } from '../Types/Types';
import { RouteProp } from '@react-navigation/native';

import MetarWidget from '../Components/MetarWidget';
import BannerWidget from '../Components/BannerWidget'; // New import
import { S_AIRSPACE_AUTHORIZATION_NOTICE, S_NO_WEATHER_SERVICES } from '../Constants/STRINGS'; // Assuming you'll add this string
import { REGEX_CLOUDS, REGEX_VISIBILITY } from '../Constants/REGEX';

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

const extractVisibilityAndClouds = (metar: string) => {
  const visMatch = metar.match(REGEX_VISIBILITY);// || metar.match(/ (\d{4}) /);
  const visibility = visMatch ? (visMatch[1].length === 4 ? `${visMatch[1]}m` : `${visMatch[1]}SM`) : 'N/A';

  const clouds = [];
  let match;
  while ((match = REGEX_CLOUDS.exec(metar)) !== null) {
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
  const [noWeatherData, setNoWeatherData] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      setNoWeatherData(false);

      try {
        const metarData = await getMetar(icao);
        const tafData = await getTaf(icao);

        if (metarData === "" || tafData === "") {
          setNoWeatherData(true);
        } else {
          setMetar(metarData);
          setTaf(tafData);
        }
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

      {!loading && !error && noWeatherData && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{S_NO_WEATHER_SERVICES}</Text>
        </View>
      )}

      {!loading && !error && !noWeatherData && (
        <ScrollView style={styles.weatherContainer}>
          {/* Show banner first */}
          <Text style={styles.notice}>{S_AIRSPACE_AUTHORIZATION_NOTICE}</Text>
          <BannerWidget visibility={visibility} clouds={clouds} />

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
  notice: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  noDataContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default WeatherScreen;
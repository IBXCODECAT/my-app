import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types';
import { WEATHER_SCREEN_NAME } from '../Constants/Screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/drone.svg')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Aviation Weather</Text>
      <Text style={styles.subtitle}>Created by Nathan Schmitt</Text>
      <Text style={styles.description}>
        Designed specifically for drone pilots to check METAR and TAF conditions with ease.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Let's Go"
          onPress={() => navigation.navigate(WEATHER_SCREEN_NAME)}
          color="#0055A4"
        />
      </View>

      <Text style={styles.footer}>Powered by aviationweather.gov</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%'
  },
  logoContainer: {
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    width: 120,
    height: 120
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#002244',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  },
  buttonContainer: {
    width: '60%',
    marginBottom: 40
  },
  footer: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    width: '100%'
  }
});

export default HomeScreen;

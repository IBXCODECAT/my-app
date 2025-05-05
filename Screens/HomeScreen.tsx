import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Types';
import { WEATHER_SCREEN_NAME } from '../Constants/Screens';

import DroneLogo from '../Assets/drone.svg';
import { S_HOME_DESCRIPTION } from '../Constants/Strings';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [icao, setIcao] = useState('');

  const handleNavigate = () => {
    if (icao.trim().length === 4) {
      navigation.navigate(WEATHER_SCREEN_NAME, { icao: icao.toUpperCase() });
    } else {
      alert('Please enter a valid 4-letter ICAO code.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
    
        
        <DroneLogo width={120} height={120} />
      </View>

      <Text style={styles.title}>Aviation Weather</Text>
      <Text style={styles.subtitle}>Created by Nathan Schmitt</Text>
      <Text style={styles.description}>{S_HOME_DESCRIPTION}</Text>

      <TextInput
        placeholder="Enter ICAO Code (e.g. KATL)"
        style={styles.input}
        value={icao}
        onChangeText={setIcao}
        autoCapitalize="characters"
        maxLength={4}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Let's Go"
          onPress={handleNavigate}
          color="#0055A4"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Legistlation"
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
    marginBottom: 20
  },
  input: {
    width: '80%',
    borderColor: '#0055A4',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2
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

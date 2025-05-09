import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import WeatherScreen from './Screens/WeatherScreen';
import { RootStackParamList } from './Types/Types';
import { LEGISLATION_SCREEN_NAME } from './Constants/SCREENS';
import LegislationScreen from './Screens/LegislationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={LEGISLATION_SCREEN_NAME}
          component={LegislationScreen}
          options={{ title: 'Legislation' }}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{ title: 'Weather' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

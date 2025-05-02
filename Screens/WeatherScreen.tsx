import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WeatherScreen = () => {
  const navigation = useNavigation();

  return (
    <Button title="Back" onPress={() => navigation.goBack()} />
  );
};

export default WeatherScreen;

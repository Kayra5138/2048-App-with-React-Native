import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Play from './Play';
import Scores from './Scores';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Play" component={Play} />
        <Stack.Screen name="Scores" component={Scores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./tiles/2048.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Play')}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scores')}>
        <Text style={styles.buttonText}>Scores</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(50, 40, 60, 1)', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60%', 
    height: undefined, 
    aspectRatio: 1, 
    marginBottom: 30,
    resizeMode: 'contain', 
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    padding: 20,
    marginVertical: 10,
    width: '60%', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

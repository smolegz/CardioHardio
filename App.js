import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { useFonts, PassionOne_700Bold, PassionOne_900Black, PassionOne_400Regular } from '@expo-google-fonts/passion-one';


const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    PassionOne_700Bold,
    PassionOne_900Black,
    PassionOne_400Regular
  });

  if (!fontsLoaded) {
  return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={ {headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={ {headerShown: false}} name="Details" component={DetailsScreen} />
        <Stack.Screen name="Welcome Home" options={ {headerShown: false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    backgroundColor: 'pink',
    padding: 30 ,
    fontSize:24,
  },
});

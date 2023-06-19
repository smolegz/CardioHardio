import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HealthAnalysisScreen from "./screens/HealthAnalysisScreen";
import BMIScreen from "./screens/BMIScreen";
import RecipeScreen from "./screens/RecipeScreen";
import Slider from "./components/Slider";
import {
  useFonts,
  PassionOne_700Bold,
  PassionOne_900Black,
  PassionOne_400Regular,
} from "@expo-google-fonts/passion-one";
import {
  FiraSans_400Regular_Italic,
  FiraSans_600SemiBold_Italic,
  FiraSans_300Light,
  FiraSans_700Bold,
  FiraSans_400Regular,
} from "@expo-google-fonts/fira-sans";
import MyDrawer from "./components/MyDrawer";


const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    PassionOne_700Bold,
    PassionOne_400Regular,
    FiraSans_400Regular_Italic,
    FiraSans_600SemiBold_Italic,
    FiraSans_300Light,
    FiraSans_700Bold,
    FiraSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Details"
            component={DetailsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Slider"
            component={Slider}
          />
          <Stack.Screen
            name="Welcome Home"
            options={{
              headerShown: false,
            }}
            component={MyDrawer}
          />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Analysis"
            options={{ headerShown: false }}
            component={HealthAnalysisScreen}
          />
          <Stack.Screen
            name="BMI"
            options={{
              headerShown: false,
            }}
            component={BMIScreen}
          />
          <Stack.Screen
            name="Recipe"
            options={{
              headerShown: false,
            }}
            component={RecipeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    backgroundColor: "pink",
    padding: 30,
    fontSize: 24,
  },
});

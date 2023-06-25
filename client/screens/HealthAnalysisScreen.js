import { StyleSheet, Text, View, Linking } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';

const HealthAnalysisScreen = () => {
  const [backendData, setBackendData] = useState([{}]);

  async function logisticRegression() {
    try {
      const result = await axios.get('https://cf41-2406-3003-206f-1424-c51-d35e-aca4-cb18.ngrok-free.app/predict');
      console.log('Prediction:', result.data);
    } catch (error) {
      console.log('Failed', error);
    }
  }
  const navigation = useNavigation();

  const calculate = async () => {
    await logisticRegression();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={calculate} style={styles.button}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default HealthAnalysisScreen;

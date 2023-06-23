import { StyleSheet, Text, View, Linking } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as tf from "@tensorflow/tfjs";
import axios from 'axios';
import client from './api';

const HealthAnalysisScreen = () => {
  // const [tfReady, setTfReady] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //     fetch("https://468d-2406-3003-206f-1424-746a-6cd6-31e1-a33f.ngrok-free.app").then(
  //       response => response.json()
  //     ).then(
  //       data => {
  //         setBackendData(data)
  //       }
  //     )
  // }, []);

  // useEffect(() => {
  //   async function prepare() {
  //     await tf.ready();
  //   }
  //   prepare();
  // }, []);

  async function logisticRegression() {
    try {
      // const res = await client.post('/predict', {...backendData});
      const result = await axios.get('https://7444-2406-3003-206f-1424-746a-6cd6-31e1-a33f.ngrok-free.app/predict');
      console.log('Prediction:', res.data);
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

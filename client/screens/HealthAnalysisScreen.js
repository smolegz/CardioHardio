import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
// import { logisticRegression } from "../Backend/Testing/newLR";

const HealthAnalysisScreen = () => {
  const [tfReady, setTfReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await tf.ready();
    }
    prepare();
  }, []);

  const navigation = useNavigation();

  const calculate = async () => {
    // await logisticRegression("2023-06-08");
    console.log("Hello World!");
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

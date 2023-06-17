import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { logisticRegression } from "../Backend/Testing/newLR";

const HealthAnalysisScreen = () => {
  const navigation = useNavigation();

  const calculate = async () => {
    await logisticRegression("2023-06-07");
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

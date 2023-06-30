import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, StatusBar} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Male from "../assets/male.svg";
import Female from "../assets/female.svg";
import Slider from '@react-native-community/slider';

const BMIScreen = () => {

  const [male, setMale] = useState(true);
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(160);
  const [bmi, setBMI] = useState(0);
  const navigation = useNavigation();
  
  const toMale = () => {
    setMale(true)
  }

  const toFemale = () => {
    setMale(false);
  }

  useEffect(() =>{
    setBMI(Math.round(weight/ ((height/100) ** 2)));
  },[weight, height])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <BackButton back={() => navigation.goBack()} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 36, fontFamily: "FiraSans_700Bold" }}>
          BMI Calculator
        </Text>
      </View>
      <View style={styles.genderSelection}>
        <TouchableOpacity style={styles.male} onPress={toMale}>
          <Text
            style={[
              styles.genderText,
              male ? { fontFamily: "FiraSans_700Bold" } : null,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.female} onPress={toFemale}>
          <Text
            style={[
              styles.genderText,
              !male ? { fontFamily: "FiraSans_700Bold" } : null,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.picture}>
        {male && <Male height="60" width="60" />}
        {!male && <Female height="60" width="60" />}
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.weight}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
            Weight:
          </Text>
          <Text style={styles.heightweightText}>{weight} kg</Text>
          <Slider
            style={{ height: 40, width: 320 }}
            maximumValue={160}
            minimumValue={0}
            minimumTrackTintColor="#212A3E"
            step={1}
            onValueChange={(value) => setWeight(value)}
            value={60}
          />
        </View>
        <View style={[styles.height, { paddingBottom: 16 }]}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
            Height:
          </Text>
          <Text style={styles.heightweightText}>{height} cm</Text>
          <Slider
            style={{ height: 40, width: 320 }}
            maximumValue={250}
            minimumValue={0}
            minimumTrackTintColor="#212A3E"
            step={1}
            onValueChange={(value) => setHeight(value)}
            value={160}
          />
        </View>
        <Text
          style={[
            styles.heightweightText,
            { fontSize: 36, textAlign: "center" },
            bmi <= 24
              ? { color: "#52EA30" }
              : bmi > 24 && bmi < 30
              ? { color: "orange" }
              : { color: "red" },
          ]}
        >
          BMI:{"\n"}
          {bmi} kg/m2
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    height: 40,
    marginTop: "15%",
    paddingLeft: 20,
  },
  genderSelection: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  male: {
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "30%",
    justifyContent: "center",
    borderEndWidth: 0,
    borderColor: "#342CC9",
    backgroundColor: "#342CC9",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  female: {
    borderWidth: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: "30%",
    justifyContent: "center",
    borderColor: "#DD55DD",
    borderLeftColor: "#DD55DD",
    borderLeftWidth: 0.5,
    backgroundColor: "#DD55DD",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  genderText: {
    textAlign: "center",
    fontFamily: "FiraSans_300Light",
    color: "white",
    fontSize: 18,
  },
  picture: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  weight: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderTopWidth: 2,
    borderColor: "#212A3E",
    paddingTop: "5%",
  },
  track: {
    backgroundColor: "#212A3E",
    borderRadius: 4,
    height: 10,
  },
  height: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingTop: "5%",
  },
  heightweightText: {
    fontSize: 36,
    padding: 20,
    fontFamily: "FiraSans_400Regular_Italic",
  },
});

export default BMIScreen;
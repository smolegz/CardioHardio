import { StyleSheet, Text, View, Linking, TextInput, Button, KeyboardAvoidingView, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import BackButton from "../components/BackButton";
import Slider from '@react-native-community/slider';
import Toggle from "react-native-toggle-element";

const HealthAnalysisScreen = () => {
  const [prediction, setPrediction] = useState([{}]);

  async function logisticRegression() {
    try {
      const result = await axios.get('https://3060-2406-3003-206f-1424-e87b-4f9d-76c-e92.ngrok-free.app/predict', 
      { params: { AlcoholDrinking, Sex, PhysicalActivity, Smoking, Age, Weight, Height }});
      console.log('Prediction:', result.data);
      setPrediction(result.data);
    } catch (error) {
      console.log('Failed', error);
    }
  }

  async function saveData() {
    if (male == true) {
      setSex(1);
    } else {
      setSex(0);
    };

    if (toggleValueSmoke == true) {
      setSmoking(1);
    } else {
      setSmoking(0);
    }

    if (toggleValueAct == true) {
      setPhysical(1);
    } else {
      setPhysical(0);
    }

    if (toggleValueAlco == true) {
      setAlcohol(1);
    } else {
      setAlcohol(0);
    }
  };

  
  const performFunction = async () => {
    await saveData();
    await logisticRegression();
  }
  // Data for Backend Predictor
  const [AlcoholDrinking, setAlcohol] = useState('');
  const [Sex, setSex] = useState('');
  const [PhysicalActivity, setPhysical] = useState('');
  const [Smoking, setSmoking] = useState('');
  const [Age, setAge] = useState(18);
  const [Weight, setWeight] = useState(50);
  const [Height, setHeight] = useState(160);
  const [male, setMale] = useState(true);

  // Back button
  const navigation = useNavigation();

  // Toggle between gender
  const toMale = () => {
    setMale(true);
  }

  const toFemale = () => {
    setMale(false);
  }

  // Toggle for Smoking, Activity
  const [toggleValueSmoke, setToggleValueSmoke] = useState(false);
  const [toggleValueAct, setToggleValueAct] = useState(false);
  const [toggleValueAlco, setToggleValueAlco] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <View style={styles.header}>
        <BackButton back={() => navigation.goBack()} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 30, fontFamily: "FiraSans_700Bold"}}>Heart Disease Predictor</Text>
      </View>
 
      <View style = {styles.bottomContainer}>
        <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
              Gender:
            </Text>
      </View>
      <View style = {styles.genderSelection}>
        <TouchableOpacity style = {styles.male} onPress = {toMale}>
          <Text
            style={[
              styles.genderText,
              male ? { fontFamily: "FiraSans_700Bold"} : null,
            ]}
            >
              Male
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.female} onPress = {toFemale}>
          <Text
            style={[
              styles.genderText,
              !male ? { fontFamily: "FiraSans_700Bold"} : null,
            ]}
            >
              Female
            </Text>
        </TouchableOpacity>
      </View>
            
      <View style = {styles.bottomContainer}>
        <View style={styles.toggleContainer}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Do you smoke?
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueSmoke}
                onPress={(newState) => setToggleValueSmoke(newState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                }}
                thumbButton={{
                  activeBackgroundColor:"#55306b",
                  inActiveBackgroundColor:"#589aed",
                }}
              />
            </View>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Did you exercise today?
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueAct}
                onPress={(newState) => setToggleValueAct(newState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                }}
                thumbButton={{
                  activeBackgroundColor:"#55306b",
                  inActiveBackgroundColor:"#589aed",
                }}
              />
            </View>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Did you drink alcohol today?
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueAlco}
                onPress={(newState) => setToggleValueAlco(newState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                }}
                thumbButton={{
                  activeBackgroundColor:"#55306b",
                  inActiveBackgroundColor:"#589aed",
                }}
              />
            </View>
        </View>
      </View>


      <View style={styles.secondContainer}>
        <View style={styles.data}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
            Age:
          </Text>
          <Text style={styles.heightweightText}>{Age} years old</Text>
          <Slider
            style={{ height: 40, width: 320 }}
            maximumValue={99}
            minimumValue={1}
            minimumTrackTintColor="#212A3E"
            step={1}
            onValueChange={(value) => setAge(value)}
            value={18}
          />
        </View>
        <View style={styles.data}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
            Weight:
          </Text>
          <Text style={styles.heightweightText}>{Weight} kg</Text>
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
        <View style={[styles.data, { paddingBottom: 10 }]}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
            Height:
          </Text>
          <Text style={styles.heightweightText}>{Height} cm</Text>
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
        <Button title="Predict" onPress={performFunction} />
        <Text style={styles.prediction}>
          {prediction !== '' ? `Prediction: ${prediction}` : null}  
        </Text>
      </View>  
    </KeyboardAvoidingView>
  );
};

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
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    alignItems:"center",
  },
  data: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingTop: "5%",
  },
  track: {
    backgroundColor: "#212A3E",
    borderRadius: 4,
    height: 10,
  },
  heightweightText: {
    fontSize: 10,
    padding: 5,
    fontFamily: "FiraSans_400Regular_Italic",
  },
  prediction: {
    fontSize: 15,
  },
})

export default HealthAnalysisScreen;

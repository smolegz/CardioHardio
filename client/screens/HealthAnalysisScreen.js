import { StyleSheet, Text, View, Linking, TextInput, Button, KeyboardAvoidingView, StatusBar, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import BackButton from "../components/BackButton";
import Slider from '@react-native-community/slider';
import Toggle from "react-native-toggle-element";

const HealthAnalysisScreen = () => {
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPredictDisabled, setIsPredictDisabled] = useState(false);

  async function logisticRegression() {
    setLoading(true);
    setIsPredictDisabled(true);
    try {
      const result = await axios.get('https://192.168.50.21:8000/predict', 
      { params: { AlcoholDrinking, Sex, PhysicalActivity, Smoking, Age, Weight, Height }});
      console.log('Prediction:', result.data.prediction.toString());
      setPrediction(result.data.prediction.toString());
    } catch (error) {
      console.log('Failed', error);
    } finally {
      setLoading(false);
      setIsPredictDisabled(false);
    }
  }

  const renderResults = () => {
    if (loading) {
      return (
        <View style = {styles.loadingContainer}> 
          <ActivityIndicator size = "large" color = "#ffffff"/>
        </View>
      );
    } else if (prediction != '') {
      return (
        <View style={[styles.resultContainer, prediction === '0' ? styles.noDisease : styles.disease]}>
          <Text style = {styles.predictionText}>
            {prediction === '0' ? 'No Heart Disease Predicted' : 'Heart Disease Predicted'}
          </Text>
        </View>
      );
    }
    return null;
  }

  async function saveData() {
    if (male == true) {
      setSex(1);
    } else {
      setSex(0);
    };

    if (toggleValueSmoke == true) {
      setSmoking(0);
    } else {
      setSmoking(1);
    }

    if (toggleValueAct == true) {
      setPhysical(0);
    } else {
      setPhysical(1);
    }

    if (toggleValueAlco == true) {
      setAlcohol(0);
    } else {
      setAlcohol(1);
    }
  };

  const performFunction = async () => {
    await saveData();
    await logisticRegression();
  }

  // Data for Backend Predictor
  const [AlcoholDrinking, setAlcohol] = useState(0);
  const [Sex, setSex] = useState(1);
  const [PhysicalActivity, setPhysical] = useState(0);
  const [Smoking, setSmoking] = useState(0);
  const [Age, setAge] = useState(18);
  const [Weight, setWeight] = useState(50);
  const [Height, setHeight] = useState(160);
  const [male, setMale] = useState(true);
  const [toggleValueSmoke, setToggleValueSmoke] = useState(false);
  const [toggleValueAct, setToggleValueAct] = useState(false);
  const [toggleValueAlco, setToggleValueAlco] = useState(false);

  // Back button
  const navigation = useNavigation();

  // Toggle between gender
  const toMale = () => {
    setMale(true);
  }

  const toFemale = () => {
    setMale(false);
  }

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
        <View style={styles.toggleContainer1}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Smoker
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueSmoke}
                onPress={(smokeState) => setToggleValueSmoke(smokeState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                  width: 90,
                  height: 50,
                }}
                thumbButton={{
                  activeBackgroundColor:"#55306b",
                  inActiveBackgroundColor:"#589aed",
                }}
              />
            </View>
        </View>

        <View style={styles.toggleContainer2}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Exercised
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueAct}
                onPress={(actState) => setToggleValueAct(actState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                  width: 90,
                  height: 50,
                }}
                thumbButton={{
                  activeBackgroundColor:"#55306b",
                  inActiveBackgroundColor:"#589aed",
                }}
              />
            </View>
        </View>

        <View style={styles.toggleContainer3}>
          <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 18 }}>
                  Alcohol
            </Text>
            <View style={styles.data}>
              <Toggle
                value={toggleValueAlco}
                onPress={(alcoState) => setToggleValueAlco(alcoState)}
                leftTitle="No"
                rightTitle="Yes"
                trackBar={{
                  activeBackgroundColor:"#6771c7",
                  inActiveBackgroundColor:"#6fccd1",
                  borderActiveColor:"#333b80",
                  borderInActiveColor:"#377275",
                  width: 90,
                  height: 50,
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

        <TouchableOpacity style = {styles.predict} onPress = {performFunction} disabled = {isPredictDisabled}>
          <Text
            style={[
              styles.genderText,
            ]}
            >
              Predict
            </Text>
        </TouchableOpacity>
        {renderResults()}
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
    marginTop: 5,
    marginBottom: 20,
  },
  male: {
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height:50,
    width:100,
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
    height:50,
    width:100,
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
    flexDirection:"row",
  },
  toggleContainer1: {
    alignItems:"center",
  },
  toggleContainer2: {
    alignItems:"center",
    marginRight: 20,
    marginLeft: 30,
  },
  toggleContainer3: {
    alignItems:"center",
    marginLeft: 10,
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
    fontSize: 30,
    padding: 5,
    fontFamily: "FiraSans_400Regular_Italic",
  },
  prediction: {
    fontSize: 15,
  },
  loadingContainer: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  noDisease: {
    backgroundColor: 'green',
  },
  disease: {
    backgroundColor: 'red',
  },
  predictionText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  predict: {
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height:50,
    width:100,
    justifyContent: "center",
    borderEndWidth: 0,
    borderColor: "#151B54",
    backgroundColor: "#151B54",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 10,
  },
})

export default HealthAnalysisScreen;

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { userRefid } from "./RegisterScreen";
import { useAuth, setupProfile } from "../firebase";
import Welcome from "../assets/welcome.svg";

const DetailsScreen = () => {
  const genderList = ["Male", "Female", "Ze/zir"];

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const navigation = useNavigation();
  const userRef = doc(db, "users", userRefid);
  const currentUser = useAuth();

  const handleName = () => {
    const userData = async () => {
      const snap = await updateDoc(userRef, {
        name: name,
        id: userRefid,
        gender: gender,
        age: age,
      });
      return snap;
    };
    userData().then((snap) => {
      setupProfile(
        currentUser,
        name,
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );
      navigation.replace("Slider");
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Welcome width="250" height="250" />
        <Text style={styles.title}>Display name :</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <Text style={styles.title}>Gender :</Text>
        <SelectDropdown
          data={genderList}
          defaultButtonText={"Select gender"}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(selectedItem, index) => selectedItem}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOption}
          dropdownOverlayColor="rgba(210, 210, 210, 0.2)"
        />
        <Text style={styles.title}>Age :</Text>
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleName} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffff",
  },
  title: {
    fontSize: 20,
    fontFamily: "FiraSans_300Light",
    marginBottom: 15,
    fontWeight: 400,
    color: "#212A3E",
  },
  inputContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    width: "100%",
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    height: 40,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 10,
    marginHorizontal: 0,
  },
  dropdownOption: {
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: "10%",
    width: "40%",
  },
  button: {
    backgroundColor: "#212A3E",
    width: "100%",
    marginBottom: 10,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "FiraSans_400Regular_Italic",
  },
});

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { fireAuth, db, colRef } from "../firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Register from "../assets/register.svg";
import BackButton from "../components/BackButton";

let userRefid2;
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  const createUserProfile = async (userAuth) => {
    if (!userAuth) return;
    const createdAt = new Date();
    const userRef = await addDoc(collection(db, "users"), {
      userEmail: email,
      createdAt: createdAt,
      name: null,
    }).then((userRef) => {
      userRefid2 = userRef.id;
      console.log("id of: ", userRefid2);
    });
    navigation.replace("Details");
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(fireAuth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Successfully signed up: ", user.email);
        createUserProfile(userCredentials);
        alert("Successful");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView />
      <BackButton back={() => navigation.goBack()} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerText}>Welcome to CardioHARDio!</Text>
      </View>
      <View style={styles.svg}>
        <Register width={180} height={180} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => setconfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {
          !!passwordError && <Text style={styles.error}>{passwordError}</Text>
        }
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (password !== confirmPassword) {
              setPasswordError("Password mismatch!");
            } else {
              handleSignUp();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonOutlineText}>Proceed with sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export { userRefid2 };
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: "3%",
  },
  header: {
    width: "100%",
    height: "10%",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  headerTitle: {
    fontFamily: "FiraSans_700Bold",
    fontSize: 36,
    color: "#212A3E",
    letterSpacing: 0.5,
  },
  headerText: {
    fontFamily: "FiraSans_700Bold",
    fontSize: 26,
    color: "#3E3521",
    letterSpacing: 1,
    marginLeft: "12%",
  },
  svg: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.7,
    width: "97%",
    borderColor: "#3E3521",
  },
  inputContainer: {
    width: "95%",
    marginTop: "3%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: "8%",
    backgroundColor: "#F5F5F5",
    borderWidth: 0.5,
    borderColor: "#3E3521",
  },
  button: {
    backgroundColor: "#212A3E",
    width: '60%',
    marginTop: 30,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginLeft: '1%',
    fontWeight: 500
  }
});
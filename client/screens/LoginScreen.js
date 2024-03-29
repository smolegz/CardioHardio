import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { fireAuth, db, colRef } from "../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { query, where, getDocs } from "firebase/firestore";
import One from "../assets/Home/one.svg";

let userRefid;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const getQuery = async (q) => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userRefid = doc.data().id;
    });
    console.log("UserRefid:", userRefid);
    navigation.replace("Welcome Home");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(fireAuth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        const q = query(colRef, where("userEmail", "==", user.email));
        getQuery(q);
        alert("Successful");
        console.log("Logged in into: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <One style={styles.svg} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}> CardioHARDio</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>I am a new user!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export { userRefid };
export default LoginScreen;

const styles = StyleSheet.create({
  svg: {
    height: "250",
    width: "300",
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: "white",
    marginTop: -70,
  },
  titleContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    fontFamily: "PassionOne_700Bold",
    letterSpacing: 1,
    fontSize: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 0,
  },
  inputContainer: {
    width: "80%",
    marginTop: 0,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: "5%",
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#212A3E",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

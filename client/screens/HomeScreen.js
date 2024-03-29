import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { colRef } from "../firebase";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { userRefid } from "./LoginScreen";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import Home from "../components/Home";
import Loading from "../assets/loading.svg";
import { useAuth } from "../firebase";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  let currentUser = useAuth();
  const [url, setURL] = useState("");
  const [name, setName] = useState("");
  // let q = query(colRef, where("id", "==", userRefid));

  useFocusEffect(() => {
    console.log("Effect is running");
    
    setURL(currentUser?.photoURL);
    setName(currentUser?.displayName);

  });

  useEffect(
    () => {
      setTimeout(() => setIsLoading(false), 730);
    }
  ,[]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading width="200" height="200" />
          <ActivityIndicator size="large" color="#212A3E" />
          <Text style={{ fontFamily: "FiraSans_400Regular_Italic", marginTop: '5%' }}>
            Something is brewin'...
          </Text>
        </View>
      ) : (
        <Home name={name} url={url} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

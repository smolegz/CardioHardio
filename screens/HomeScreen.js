import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { colRef } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { userRefid } from "./LoginScreen";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import Home from "../components/Home";
import Loading from "../assets/loading.svg";

let data;
const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  let q = query(colRef, where("id", "==", userRefid));

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          data = doc.data().name;
          setIsLoading(false);
        });
      }),
    []
  );

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
          <Text style={{ fontFamily: "FiraSans_400Regular_Italic" }}>
            Something is brewin'...
          </Text>
        </View>
      ) : (
        <Home name={data} />
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

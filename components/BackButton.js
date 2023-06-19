import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "../assets/back.svg";

const BackButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.back}
      onPress={props.back}
    >
      <Back width="16" height="16" />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "FiraSans_300Light",
          color: "white",
          fontSize: 15,
        }}
      >
        Back
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    borderWidth: 1,
    borderRadius: 20,
    width: "25%",
    padding: 10,
    backgroundColor: "#212A3E",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: "grey",
    backgroundColor: "#212A3E",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default BackButton;
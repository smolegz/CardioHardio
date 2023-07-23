import { StyleSheet, Text, View, SafeAreaView , StatusBar} from "react-native";
import React from "react";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View>
        <BackButton back={() => navigation.goBack()} />
      </View>
      <View>
        <Text style={styles.header}>About Us</Text>
        <Text style={styles.text}>
          With the rise of cardiovascular diseases, CardioHardio strives to be
          user-friendly and comprehensive mobile application that aims to
          promote users living a lifestyle that is healthy and beneficial.{"\n"}
          {"\n"}
          The features that have been implemented in this mobile application
          serve as tools for users to live & maintain a healthy lifestyle.
          {"\n"}
          {"\n"}Be it you're an adult or teenager, this application is for
          EVERYONE!
          {"\n"}
          {"\n"}
          If you have any enquiries, please refer to our Support page.
        </Text>
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          height: 400,
        }}
      >
        <Text>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "4%",
    marginRight: "4%",
  },
  header: {
    marginTop: "3%",
    fontFamily: "FiraSans_700Bold",
    fontSize: 32,
  },
  text: {
    fontSize: 15,
    fontFamily: "FiraSans_400Regular_Italic",
    marginTop: "5%",
    color: "black",
    textAlign: "justify",
  },
});

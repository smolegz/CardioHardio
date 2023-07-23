import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const ContactScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View>
        <BackButton back={() => navigation.goBack()} />
      </View>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.text}>To report any problem, please approach us via:</Text>
      <View style={styles.box}>
        <Text style={styles.boxHeader}>Email Us:</Text>
        <Text style={styles.boxText}>
          zhuohui.koo@gmail.com / ytgoulding@gmail.com
        </Text>
        <View style={{ marginTop: "5%" , borderTopWidth: 1, borderColor: 'white', marginBottom: '5%'}}></View>
        <Text style={styles.boxHeader}>Telegram:</Text>
        <Text style={styles.boxText}>@ivank29 / @Matchaforeverything</Text>
      </View>
    </View>
  );
};

export default ContactScreen;

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
  box: {
    borderRadius: 16,
    backgroundColor: "#212A3E",
    height: 200,
    marginTop: "5%",
    padding: 20,
  },
  boxHeader: {
    color: "white",
    fontSize: 18,
    fontFamily: "FiraSans_700Bold",
    marginLeft: "3%",
  },
  boxText: {
    color: "white",
    fontSize: 15,
    fontFamily: "FiraSans_400Regular_Italic",
    marginLeft: "3%",
    marginTop: "1%",
  },
});

import React from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    title: "Welcome to CardioHARDio",
    text: "An easy-to-use app to keep you healthy!",
    image: require("../assets/Slider/slider1.png"),
  },
  {
    title: "Stay active with us!",
    text: "Our app offer features that you'll need daily.",
    image: require("../assets/Slider/slider2.png"),
  },
  {
    title: "Keeping a healthy heart!",
    text: "Stay healthy for your loved ones!",
    image: require("../assets/Slider/slider3.png"),
  },
];

const Slider = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>Proceed</Text>
      </View>
    );
  };

  const onDone = () => {
    navigation.replace("Welcome Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        data={data}
        onDone={onDone}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    height: "40%",
    width: "90%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 30,
  },
  title: {
    fontFamily: "FiraSans_700Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontFamily: "FiraSans_300Light",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "#212A3E",
    borderWidth: 1,
    borderColor: "#212A3E",
  },
  buttonText: {
    color: "white",
    fontFamily: "FiraSans_300Light",
  },
  dotStyle: {
    backgroundColor: "#E0E0E0",
  },
  activeDotStyle: {
    backgroundColor: "#212A3E",
  },
});

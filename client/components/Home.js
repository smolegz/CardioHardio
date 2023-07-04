import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState  } from "react";
import { useNavigation } from "@react-navigation/native";
import { fireAuth } from "../firebase";
import Logo from "../assets/drawer.svg";
import One from "../assets/Home/one.svg";
import Two from "../assets/Home/two.svg";
import Three from "../assets/Home/three.svg";
import Four from "../assets/Home/four.svg";
import Five from "../assets/Home/five.svg";
import * as Updates from "expo-updates";
import StepsButton from "./StepButton";
import { Pedometer } from "expo-sensors";


const DATA = [
  {
    activities: "BMI Calculator",
    id: "1",
    color: "#FB4A15",
    photo: <One style={{ height: 120, width: 120 }} />,
    name: "BMI",
  },
  {
    activities: "Steps Tracker",
    id: "2",
    color: "#6B9CDE",
    photo: <Two style={{ height: 120, width: 120 }} />,
    name: "Steps",
  },
  {
    activities: "Healthy Recipe",
    id: "3",
    color: "#DE6BDC",
    photo: <Three style={{ height: 120, width: 120, opacity: 1 }} />,
    name: "Recipe",
  },
  {
    activities: "Health Analysis",
    id: "4",
    color: "#6BDE7A",
    photo: <Four style={{ height: 120, width: 120 }} />,
    name: "",
  },
  {
    activities: "Coming Soon",
    id: "5",
    color: "#FAD69C",
    photo: <Five style={{ height: 120, width: 120 }} />,
    name: "",
  },
];

const Home = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    reactToUpdates();
    subscribe();
  }, []);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    setRefreshing(true);

    if (isAvailable) {
      let end = new Date();
      let start = new Date(end.getFullYear(),end.getMonth(),end.getDate(),0,0,0);
   
      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      setCurrentStepCount(pastStepCountResult.steps);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  }

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("Update Available. Please Restart.");
      }
      if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
        alert("NO Update Available.");
      }
    });
  };

  const handleSignOut = () => {
    fireAuth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const goHealthAnalysis = () => {
    navigation.navigate("Analysis");
  };

  

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <View style={styles.curve}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.pictureContainer}>
              <View style={styles.innerRadius}>
                <Image style={styles.tinyLogo} src={props.url} />
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.welcome}>Welcome Home, {props.name}</Text>
              <TouchableOpacity onPress={goToProfile}>
                <Text style={{ color: "white" }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.drawer}
            onPress={() => navigation.openDrawer()}
          >
            <Logo style={styles.svg} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={subscribe}
            tintColor={"#212A3E"}
          />
        }
      >
        <StepsButton steps={currentStepCount} />
        <View style={styles.exploreContainer}>
          <Text style={styles.exploreText}> EXPLORE </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.MenuContainer}>
            {DATA.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.MenuButton,
                    { backgroundColor: `${item.color}` },
                  ]}
                  onPress={() => navigation.navigate(item.name)}
                >
                  {item.photo}
                  <Text
                    style={{
                      fontFamily: "PassionOne_400Regular",
                      fontSize: 18,
                      color: "#ffffff",
                    }}
                  >
                    {item.activities}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.MenuButton}
              onPress={goHealthAnalysis}
            >
              <Text
                style={{
                  fontFamily: "PassionOne_400Regular",
                  fontSize: 18,
                  color: "#000000",
                }}
              >
                Health Analysis (For Yuan Ting)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signout}>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    
  },
  welcome: {
    fontSize: 18,
    fontFamily: "FiraSans_600SemiBold_Italic",
    color: "white",
  },
  curve: {
    backgroundColor: "#212A3E",
    height: 128,
    borderBottomEndRadius: 28,
    borderBottomLeftRadius: 28,
    width: "100%",
    
  },
  svg: {
    height: 20,
    width: 20,
    position: "fixed",
    margin: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
  },
  tinyLogo: {
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "9%",
    width: "100%",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "1%",
  },
  pictureContainer: {
    borderColor: "white",
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "4%",
  },
  innerRadius: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: "50%",
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginLeft: "3%",
    justifyContent: "center",
  },
  MenuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "98%",
    justifyContent: "flex-start",
    flex: 1,
  },
  MenuButton: {
    padding: 0,
    margin: 2,
    marginLeft: 15,
    marginBottom: 5,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
    opacity: 0.95,
  },
  exploreContainer: {
    display: "flex",
    padding: "3%",
    paddingBottom: 0,
    justifyContent: "flex-end",
    flex: 1,
  },
  exploreText: {
    fontFamily: "PassionOne_700Bold",
    fontSize: 40,
    color: "#212A3E",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContentt: "space-between",
    height: 600,
  },
  signout: {
    marginTop: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

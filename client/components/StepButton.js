import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { Pedometer } from "expo-sensors";
import { useNavigation } from "@react-navigation/native";
import Walk from '../assets/walk.svg'

const StepsButton = () => {
  const navigation = useNavigation();
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);

   useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      let end = new Date();
      let start = new Date(end.getFullYear(),end.getMonth(),end.getDate(),0,0,0);
   
      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);

      setCurrentStepCount(pastStepCountResult.steps);
    }
  }
  const value = (currentStepCount / 5000 )> 1 ? 1 : currentStepCount/5000;
  const progressData = {
    data: [value],
  };

  const chartConfig = {
    backgroundGradientFrom: "#212a3e",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#212a3e",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(5, 253, 0  , ${opacity})`,
  };

  const goToPedometer = () => {
    navigation.navigate("Steps");
  }

  return (
    <View>
      <Text style={styles.progressTitle}>INFO</Text>
      <View style={styles.progress}>
        <TouchableOpacity style={styles.progressButton} onPress={goToPedometer}>
          <Walk height={40} width={40} style={{marginLeft: 100}} />
            <ProgressChart
              data={progressData}
              width={100}
              height={100}
              strokeWidth={14}
              radius={34}
              chartConfig={chartConfig}
              hideLegend={true}
              style= {{
                marginLeft: -70
              }}
            />
            <View style={styles.progressDetails}>
              <Text style={styles.progressText}>{currentStepCount} steps</Text>
              <Text style={styles.progressText}>
                {((currentStepCount / 5000) * 100).toFixed(1)}% progress
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "FiraSans_400Regular",
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                Tap for details
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressTitle: {
    fontSize: 40,
    fontFamily: "PassionOne_700Bold",
    marginVertical: 5,
    width: "100%",
    marginLeft: 15,
    color: '#212A3E'
  },
  progress: {
    borderWidth: 1,
    height: 120,
    marginTop: 5,
    width: "96%",
    marginHorizontal: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#242A3E",
  },
  progressButton: {
    width: "100%",
    height: 140,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progressText: {
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
    fontSize: 18,
  },
  progressDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});

export default StepsButton;
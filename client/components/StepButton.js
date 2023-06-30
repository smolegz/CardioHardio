import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import Walk from '../assets/walk.svg'

const StepsButton = (props) => {
  const navigation = useNavigation();

  const value = (props.steps / 5000 )> 1 ? 1 : props.steps/5000;
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
                marginLeft: -70,
              }}
            />
            <View style={styles.progressDetails}>
              <Text style={styles.progressText}>{props.steps} steps</Text>
              <Text style={styles.progressText}>
                {((props.steps / 5000) * 100).toFixed(1)}% progress
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
    color: "#212A3E",
  },
  progress: {
    height: 120,
    marginTop: 5,
    width: "96%",
    marginHorizontal: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#212A3E",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
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
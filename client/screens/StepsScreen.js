import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { Pedometer } from "expo-sensors";
import { BarChart, ProgressChart } from "react-native-chart-kit";

const StepsScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [array, setArray] = useState([]);
  const [date, setDate] = useState([])

  const navigation = useNavigation();
  let arr = [];
  let dateArray = [];

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setRefreshing(true);
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      let end = new Date();
      let start = new Date(end.getFullYear(),end.getMonth(),end.getDate(),0,0,0);
   
      for (let i = 0; i < 7; i ++) {
        console.log("End:", end.toString());
        console.log("Start: ", start.toString());
        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);

        if (pastStepCountResult) {
          //append new result to first in array
          arr.unshift(pastStepCountResult.steps);
          dateArray.unshift(start.toDateString().slice(0,3));

          // change end date
          end.setFullYear(start.getFullYear(), start.getMonth(), start.getDate());
          end.setHours(0);
          end.setMinutes(0);

          //change start date
          start.setTime(start.getTime() - (24*3600000));
        }
        console.log(arr);
      }
      dateArray.push("nil")
      arr.push(Number(Math.max(...arr).toPrecision(1)) + 10000);
      setArray(arr);
      setDate(dateArray);
      setCurrentStepCount(arr[6]);
      setTimeout(() => {
        setRefreshing(false);
      }, 500);

      return Pedometer.watchStepCount((result) => {
        // setCurrentStepCount(result.steps);
       
      });
    }
  };

  const value = (currentStepCount / 5000 )> 1 ? 1 : currentStepCount/5000;

  useEffect(() => {
    const subscription = subscribe();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#212a3e",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#212a3e",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 128, 255, ${opacity})`,
    labelColor: (opacity = 1) => "white",
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.8,
    barRadius: 10,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 0.5,
      stroke: "grey",
    },
    fillShadowGradientOpacity: 1,
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView refreshControl= {
          <RefreshControl refreshing={refreshing} onRefresh={subscribe} tintColor={"#212A3E"}/>
        }>
        <StatusBar barStyle="dark-content" />
        <View>
          <BackButton back={() => navigation.goBack()} />
        </View>
        <View style={{ zIndex: -1 }}>
          <View style={styles.progress}>
            <View>
              <Text style={styles.progressText}>Daily Step Tracker</Text>
            </View>
            <ProgressChart
              data={{
                data: [value],
              }}
              width={100}
              height={100}
              strokeWidth={20}
              radius={36}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{
                marginLeft: 0,
                paddingVertical: 5,
              }}
            />
            <Text style={styles.progressText}>
              {currentStepCount} out of 5,000 steps today
            </Text>
            <Text style={styles.progressSmallText}>
              Dist. Travelled: {(currentStepCount / 1300).toFixed(3)} km
            </Text>
            <Text style={styles.progressSmallText}>
              Calories Burnt: {(currentStepCount * 0.04615).toFixed(0)} kcal
            </Text>
            <Text style={styles.progressSmallText}>
              Progress: {(currentStepCount / 5000) * 100}%
            </Text>
          </View>
          <Text style={styles.text}>Steps Taken in Last 7 Days</Text>
          <View style={styles.barChart}>
            <BarChart
              style={{
                // marginHorizontal: "1%",
                backgroundColor: "#212A3E",
                paddingTop: 20,
                borderRadius: 20,
                width: "100%",
                marginTop: "3%",
                overflow: "hidden",
              }}
              data={{
                labels: date,
                datasets: [
                  {
                    data: array,
                  },
                ],
              }}
              width={430}
              height={320}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              withHorizontalLabels={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              withInnerLines={true}
            />
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    
  );
}

export default StepsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 26,
    fontFamily: "FiraSans_700Bold",
    paddingTop: 30,
    marginLeft: 10,
  },
  progress: {
    width: "80%",
    height: 280,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#212A3E",
    marginLeft: "10%",
    marginTop: 20,
    borderRadius: 30,
    shadowColor: "#212A3E",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  progressText: {
    fontSize: 18,
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
    paddingBottom: 2,
  },
  progressSmallText: {
    fontSize: 14,
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
  },
  barChart: {
    width: "97%",
    justifyContent: "center",
    shadowColor: "#212A3E",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
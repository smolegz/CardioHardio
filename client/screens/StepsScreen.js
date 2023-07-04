import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { Pedometer } from "expo-sensors";
import { BarChart, ProgressChart } from "react-native-chart-kit";
import Distance from '../assets/distance.svg';
import Calories from "../assets/calories.svg";
import Left from '../assets/left.svg';
import Right from "../assets/right.svg";

const StepsScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [todayStepCount, setTodayStepCount] = useState(0);
  const [array, setArray] = useState([]);
  const [date, setDate] = useState([]);
  
  const [count, setCount] = useState(6);
  const [dateCardArray, setDateCardArray] = useState([]);

  const navigation = useNavigation();
  let arr = [];
  let dateArray = [];
  let dateCard = [];

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setRefreshing(true);
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      let end = new Date();
      let start = new Date(end.getFullYear(),end.getMonth(),end.getDate(),0,0,0);
   
      for (let i = 0; i < 7; i ++) {
        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);

        if (pastStepCountResult) {
          //append new result to first in array
          arr.unshift(pastStepCountResult.steps);
          console.log(start.toDateString())
          dateArray.unshift(start.toDateString().slice(0, 3));
          dateCard.unshift(start.toDateString().slice(0, 10));

          // change end date
          end.setFullYear(start.getFullYear(), start.getMonth(), start.getDate());
          end.setHours(0);
          end.setMinutes(0);

          //change start date
          start.setTime(start.getTime() - (24*3600000));
        }
      }
      dateArray.push("nil")
      arr.push(Number(Math.max(...arr).toPrecision(1)) + 4000);
      for (let i = 0; i < dateCard.length; i++) {
        dateCard[i] = dateCard[i].slice(0,3) + ", " + dateCard[i].slice(4)
      }
      setArray(arr);
      setDate(dateArray);
      setDateCardArray(dateCard);
      setTodayStepCount(arr[6]);
      setCount(6);
      setTimeout(() => {
        setRefreshing(false);
      }, 750);

      return Pedometer.watchStepCount((result) => {
        // setCurrentStepCount(result.steps);
       
      });
    }
  };

  const previous = () =>{
    setCount(count - 1);
  };

  const next = () => {
    setCount(count + 1);
  };


  const value = (todayStepCount / 5000 )> 1 ? 1 : todayStepCount/5000;

  useEffect(() => {
    const subscription = subscribe();
  }, []);

  useEffect(() => {
    setTodayStepCount(array.length === 0 ? 0 : array[count]);
  },[count])


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
    <View style={styles.container}>
      <SafeAreaView edges={["bottom", "left", "right"]} />
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={subscribe}
            tintColor={"#212A3E"}
          />
        }
        style={{ paddingTop: "3%" }}
      >
        <View>
          <BackButton back={() => navigation.goBack()} />
        </View>

        <View>
          <View style={styles.progress}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              {count >= 1 && (
                <TouchableOpacity
                  onPress={previous}
                  style={{ left: 20, position: "absolute", padding: 10 }}
                >
                  <Left height={20} width={20} />
                </TouchableOpacity>
              )}
              <View>
                <Text style={styles.headerText}>{dateCardArray[count]}</Text>
              </View>
              {count < 6 && (
                <TouchableOpacity
                  onPress={next}
                  style={{ right: 20, position: "absolute", padding: 10 }}
                >
                  <Right height={20} width={20} />
                </TouchableOpacity>
              )}
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
              {todayStepCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              out of 5,000 steps
            </Text>
            <Text style={styles.progressSmallText}>
              Progress: {((todayStepCount / 5000) * 100).toFixed(2)} %
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <Distance width={40} height={40} />
              <Text style={styles.progressSmallText}>
                {(todayStepCount / 1300).toFixed(3)} km
              </Text>
            </View>
            <View style={styles.details}>
              <Calories width={40} height={40} />
              <Text style={styles.progressSmallText}>
                {(todayStepCount * 0.04615).toFixed(0)} kcal
              </Text>
            </View>
          </View>
          <Text style={styles.text}>Steps Taken in Last 7 Days</Text>
          <View style={styles.barChart}>
            <BarChart
              style={{
                backgroundColor: "#212A3E",
                paddingTop: 20,
                borderRadius: 20,
                width: "100%",
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
              height={420}
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
    </View>
  );
}

export default StepsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 26,
    fontFamily: "FiraSans_700Bold",
    paddingTop: 30,
    marginLeft: 10,
  },
  progress: {
    width: "97%",
    height: 280,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#212A3E",
    marginTop: 30,
    borderRadius: 30,
    shadowColor: "#212A3E",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  progressText: {
    fontSize: 18,
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
    paddingBottom: 2,
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
    paddingBottom: 2,
    marginLeft: 40,
    position: "absolute",
    left: 120,
  },
  progressSmallText: {
    fontSize: 14,
    color: "white",
    fontFamily: "FiraSans_600SemiBold_Italic",
    width: "40%",
    textAlign: "center",
  },
  barChart: {
    width: "97%",
    justifyContent: "center",
    shadowColor: "#212A3E",
    borderRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    backgroundColor: "white",
    marginTop: '3%',
    marginBottom: 50,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "97%",
  },
  details: {
    borderWidth: 1,
    borderRadius: 20,
    width: "45%",
    height: 60,
    backgroundColor: "#212A3E",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
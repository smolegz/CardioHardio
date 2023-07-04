import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";
import { SearchBar, Card } from "react-native-elements";
import { RECIPE } from "../components/Recipe";
import Close from "../assets/close.svg"

let DATA = RECIPE;

const RecipeScreen = () => {

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [dinner, setDinner] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    setMasterDataSource(DATA);
    setFilteredData(DATA);
  },[])

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = DATA.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterDataSource);
      setSearch(text);
    }
  };

  const handleMeal = (text) => {
    const newData = DATA.filter((item) => {
      return item.meal.includes(text);
    });
    setFilteredData(newData);
  }
  
  const handleVegetarian = (text) => {
    const newData = DATA.filter((item) => {
      return item.vegetarian === text;
    });
    setFilteredData(newData);
  };

  const handleClear = () => {
    setBreakfast(false);
    setLunch(false);
    setDinner(false);
    setVegetarian(false);
    setFilteredData(masterDataSource);
    setSearch('')
  }

  const renderModal = (item) => {
    setModalVisible(!modalVisible);
    setItem(item);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.header}>
          <BackButton back={() => navigation.goBack()} />
          <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={{
              backgroundColor: "#212A3E",
              height: "80%",
              width: "18%",
              borderRadius: 20,
            }}
            placeholder="Feelin' hungry"
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            inputStyle={styles.input}
          />
        </View>
        <View style={styles.filterHeader}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              breakfast ? { backgroundColor: "#212A3E" } : null,
            ]}
            onPress={() => {
              handleMeal("Breakfast");
              setBreakfast(true);
              setLunch(false);
              setDinner(false);
              setVegetarian(false);
            }}
          >
            <Text style={[styles.text, breakfast ? { color: "white" } : null]}>
              Breakfast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              lunch ? { backgroundColor: "#212A3E" } : null,
            ]}
            onPress={() => {
              handleMeal("Lunch");
              setLunch(true);
              setBreakfast(false);
              setDinner(false);
              setVegetarian(false);
            }}
          >
            <Text style={[styles.text, lunch ? { color: "white" } : null]}>
              Lunch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              dinner ? { backgroundColor: "#212A3E" } : null,
            ]}
            onPress={() => {
              handleMeal("Dinner");
              setDinner(true);
              setLunch(false);
              setBreakfast(false);
              setVegetarian(false);
            }}
          >
            <Text style={[styles.text, dinner ? { color: "white" } : null]}>
              Dinner
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              vegetarian ? { backgroundColor: "#212A3E" } : null,
            ]}
            onPress={() => {
              handleVegetarian("Vegetarian");
              setVegetarian(true);
              setBreakfast(false);
              setLunch(false);
              setDinner(false);
            }}
          >
            <Text style={[styles.text, vegetarian ? { color: "white" } : null]}>
              Vegetarian
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClear()}
          >
            <Text style={styles.text}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "FiraSans_700Bold", fontSize: 28 }}>
            Recipes for YOU
          </Text>
          <Text
            style={{
              fontFamily: "FiraSans_700Bold",
              fontSize: 20,
              marginLeft: 20,
              marginTop: 7,
            }}
          >
            {filteredData.length} results found
          </Text>
        </View>
        <View>
          {filteredData.map((item) => {
            return (
              <TouchableOpacity key={item.id} onPress={() => renderModal(item)}>
                <Card containerStyle={styles.card}>
                  <Image src={item.link} style={styles.img}></Image>
                  <Card.Divider></Card.Divider>
                  <Card.Title
                    style={{
                      fontSize: 20,
                      textAlign: "left",
                      fontFamily: "FiraSans_700Bold",
                    }}
                  >
                    {item.title}
                  </Card.Title>
                  <Text>{item.description}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            // presentationStyle="fullScreen"
          >
            <SafeAreaView>
              <ScrollView>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Pressable
                      onPress={() => setModalVisible(false)}
                      style={{ paddingTop: 20 }}
                    >
                      <Close />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 2,
                      width: "95%",
                      marginTop: 10,
                      borderColor: "#212A3E",
                      marginBottom: 20,
                    }}
                  ></View>
                  <Image src={item?.link} style={styles.modalImg}></Image>
                  <View style={styles.modalDetails}>
                    <Text style={styles.modalText}>Meal: {item?.meal}</Text>
                    <Text style={styles.modalText}>
                      Diet: {item?.vegetarian}
                    </Text>
                    <Text style={styles.modalText}>
                      Calories: {item?.calories} kcal
                    </Text>
                    <Text style={styles.modalText}>
                      Preparation: {item?.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      borderTopWidth: 1,
                      paddingBottom: 20,
                    }}
                  ></View>
                  <View style={styles.modalDetails}>
                    <Text style={styles.modalText}>
                      Instructions:
                      {"\n"}
                      {"\n"}
                      {item?.description}
                      {"\n"}
                      {"\n"}
                      {item?.description}
                      {"\n"}
                      {"\n"}
                      {item?.description}
                      {item?.description}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  back: {
    marginLeft: 0,
  },
  searchContainer: {
    width: "70%",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212A3E",
    marginLeft: 10,
  },
  inputContainer: {
    borderRadius: 20,
    height: 33,
    paddingHorizontal: 0,
    backgroundColor: "#F2F6F1",
  },
  input: {
    fontFamily: "FiraSans_300Light",
    fontSize: 16,
    color: "#363836",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  filterButton: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    color: "black",
  },
  text: {
    fontFamily: "FiraSans_400Regular",
    fontSize: 14,
  },
  card: {
    borderRadius: 10,
    marginLeft: 10,
  },
  img: {
    height: 180,
    width: "100%",
    marginBottom: 10,
  },
  clearButton: {
    paddingVertical: 5,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 10,
    alignItems: "center",
  },
  title: {
    fontFamily: "FiraSans_700Bold",
    fontSize: 28,
    width: "87%",
    paddingTop: 20,
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  modalImg: {
    height: 240,
    width: "95%",
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1C1C1C",
  },
  modalDetails: {
    width: "95%",
    paddingBottom: 40,
  },
  modalText: {
    fontFamily: "FiraSans_400Regular",
    fontSize: 16,
    paddingVertical: 7,
  },
});
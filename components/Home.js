import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { fireAuth} from '../firebase'
import Logo from "../assets/drawer.svg";

// const DATA = [
//   {
//     activities: 'BMI Calculator',
//     id: '1'
//   },
//   {
//     activities: 'Pedometer',
//     id: '2'
//   }, 
//   {
//     activities: 'Healthy Recipe',
//     id: '3'
//   },
//   {
//     activities: 'Health Analysis',
//     id: '4'
//   },
//   {
//     activities: 'Coming Soon',
//     id: '5'
//   }
// ]

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.MenuButton}>
    <Text>{item.activities}</Text>
  </TouchableOpacity>
);

const Home = (props) => {

  const navigation = useNavigation();
  const handleSignOut = () => {
    fireAuth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

    return (
        <ScrollView style={styles.innerContainer}>

          <View style={styles.curve}>
            <View style={styles.header}>
              <View style={styles.profile}>
              <View style={styles.pictureContainer}>
                <View style={styles.innerRadius}>
                <Image
                style={styles.tinyLogo}
                source={require('../assets/favicon.png')}
                />
                </View>
              </View>
              <View style={styles.titleContainer}> 
                  <Text style={styles.welcome}>Welcome Home, {props.name}</Text>
              
              <TouchableOpacity><Text>Edit Profile</Text></TouchableOpacity>
              </View>
              </View>
              <TouchableOpacity style={styles.drawer} onPress={() => navigation.openDrawer()}>
                  <Logo style={styles.svg}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}> Explore </Text>
          </View>
          <View style={styles.MenuContainer}>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
  
        </ScrollView>

    )
}

export default Home;

const styles = StyleSheet.create({
    innerContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    },
    welcome: {
      fontSize: 18,
      fontFamily: 'FiraSans_600SemiBold_Italic',      
    },
    curve: {
      zIndex: '-1',
      backgroundColor: '#F8A9F8',
      height: 123,
      borderBottomEndRadius: 28,
      borderBottomLeftRadius: 28, 
      opacity: 1,
    },
    svg: {
      height: 20,
      width: 20,
      position: 'fixed',
      margin: 10,
    },  
    button: {
      backgroundColor: '#0782F9',
      width: '60%',
      marginBottom: 10,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16, 
    },
    tinyLogo: {
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '9%',
      width: '100%'
    }, 
    profile: {
      display: 'flex',
      flexDirection: 'row',
    },
    pictureContainer: {
      borderColor: '#00000E',
      borderWidth: 2,
      height: 80,
      width: 80,
      borderRadius: '50%',    
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '3%',
    },
    innerRadius: {
      borderWidth: 1,
      borderColor: '#00000E',
      borderRadius: '50%',
      height: 72,
      width: 72,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    titleContainer: {
      marginLeft: '2%',
      justifyContent: 'center',
    }, 
    MenuContainer: {
      marginTop: 0,
      flexDirection:'row',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-evenly',
 
    
    },
    MenuButton: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 40,
      margin: 2,
      marginLeft: 0,
      marginRight: 0,
      width: '45%',
      justifyContent: 'center',
      alignItems:'center',
      height: '45%',
    },
    exploreContainer: {
      display: 'flex',
      padding: '3%',
      paddingBottom: 0,
      
    },
    exploreText: {
      fontFamily: 'FiraSans_600SemiBold_Italic',
      fontSize: 40,
    }
  })
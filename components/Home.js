import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fireAuth} from '../firebase'

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
          <View style={styles.MenuContainer}>
          <TouchableOpacity style={styles.MenuButton}><Text >Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.MenuButton}><Text>Edit Profile</Text></TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>

    )
}

export default Home;

const styles = StyleSheet.create({
    innerContainer: {
      // justifyContent: 'space-between',
      // alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    welcome: {
      fontSize: 25,
      fontFamily: 'PassionOne_400Regular',
      
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
      width: 70,
      height: 70,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profile: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: '15%',
      marginLeft: 0,
      width: '90%'
    }, 
    pictureContainer: {
      borderColor: '#00000E',
      borderWidth: 2,
      height: 80,
      width: 80,
      borderRadius: '50%',    
      justifyContent: 'center',
      alignItems: 'center'  
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
      marginLeft: '5%',
    }, 
    MenuContainer: {
      marginTop: '5%',
      flexDirection:'row',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-evenly',
 
    
    },
    MenuButton: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 40,
      padding: 40,
      margin: 10,
      marginLeft: 0,
      marginRight: 0,
      width: '45%',
      justifyContent: 'center',
      alignItems:'center',
      height: '45%',
    }
  })
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { fireAuth} from '../firebase'
import Logo from "../assets/drawer.svg";
import One from "../assets/one.svg";
import Two from "../assets/two.svg";
import Three from "../assets/three.svg";
import Four from "../assets/four.svg";
import Five from "../assets/five.svg";
import { useAuth } from '../firebase';

const DATA = [
  {
    activities: 'BMI Calculator',
    id: '1',
    color: '#FB4A15',
    photo: <One style={{height: 120, width: 120}}/>
  },
  {
    activities: 'Pedometer',
    id: '2',
    color: '#6B9CDE',
    photo: <Two style={{height: 120, width: 120}}/>
  }, 
  {
    activities: 'Healthy Recipe',
    id: '3',
    color: '#DE6BDC',
    photo: <Three style={{height: 120, width: 120, opacity: 1}}/>
  },
  {
    activities: 'Health Analysis',
    id: '4',
    color: '#6BDE7A',
    photo: <Four style={{height: 120, width: 120}}/>
  },
  {
    activities: 'Coming Soon',
    id: '5',
    color: '#FAD69C',
    photo: <Five style={{height: 120, width: 120}}/>
  }
]

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.MenuButton}>
    <Text>{item.activities}</Text>
  </TouchableOpacity>
);

const Home = (props) => {
  const [url, setURL] = useState('');
  const [name, setName] = useState('');
  let currentUser = useAuth();
  console.log("Rendered")
  // console.log(currentUser)
  // // console.log(currentUser.photoURL)
  const navigation = useNavigation();
  const handleSignOut = () => {
    fireAuth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
    useFocusEffect(() => {
      setURL(currentUser?.photoURL)
      setName(currentUser?.displayName)
    })

    const goToProfile = () => {
      navigation.navigate("Profile")
    }
    return (
        <View style={{width: '100%', flex: 1}}>
          <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
          <View style={styles.curve}>
            <View style={styles.header}>
              <View style={styles.profile}>
              <View style={styles.pictureContainer}>
                <View style={styles.innerRadius}>
                  <Image style={styles.tinyLogo} src={url}/>
                </View>
              </View>
              <View style={styles.titleContainer}> 
                <Text style={styles.welcome}>Welcome Home, {name}</Text>
                <TouchableOpacity onPress={goToProfile}><Text style={{color: 'white'}}>Edit Profile</Text></TouchableOpacity>
              </View>
            </View>
              <TouchableOpacity style={styles.drawer} onPress={() => navigation.openDrawer()}>
                  <Logo style={styles.svg}/>
              </TouchableOpacity>
            </View>
          </View>
        <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.exploreContainer}>
              <Text style={styles.exploreText}> EXPLORE </Text>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.MenuContainer}>
            {
                DATA.map((item) => {
                  return (
                  <TouchableOpacity key={item.id} style={[styles.MenuButton,{backgroundColor: `${item.color}`}]}>
                    {item.photo}
                    <Text style={{
                      fontFamily: 'PassionOne_400Regular',
                      fontSize: 18, 
                      color: '#ffffff',
                    }}
                  >{item.activities}</Text>
                  </TouchableOpacity>
                )})
            }
            </View> 
          </View>
          <View style={styles.signout}>
              <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    innerContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#FBFBFB',
  
    },
    welcome: {
      fontSize: 18,
      fontFamily: 'FiraSans_600SemiBold_Italic',
      color: 'white',      
    },
    curve: {
      zIndex: '-1',
      backgroundColor: '#212A3E',
      height: 128,
      borderBottomEndRadius: 28,
      borderBottomLeftRadius: 28, 
      width: '100%',
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
      padding: 15,
      borderRadius: 10,
    
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 18, 
      alignSelf: 'center'
    },
    tinyLogo: {
      width: 60,
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 35,
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
      marginLeft: '1%',
    },
    pictureContainer: {
      borderColor: 'white',
      borderWidth: 2,
      height: 80,
      width: 80,
      borderRadius: '50%',    
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '4%',
    },
    innerRadius: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: '50%',
      height: 72,
      width: 72,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      marginLeft: '3%',
      justifyContent: 'center',
    }, 
    MenuContainer: {
      flexDirection:'row',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'flex-start',
      flex: 1,
    },
    MenuButton: {
      padding: 0,
      margin: 2,
      marginLeft: 15,
      marginBottom: 5,
      width: '45%',
      justifyContent: 'center',
      alignItems:'center',
      height: '45%',
      opacity: 0.95
    },
    exploreContainer: {
      display: 'flex',
      padding: '3%',
      paddingBottom: 0,
      justifyContent: 'flex-end',
      flex: 1,
    },
    exploreText: {
      fontFamily: 'PassionOne_700Bold',
      fontSize: 40,
      // textDecorationLine: 'underline',
      color: '#0C134F'
    },
    bodyContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContentt: 'space-between',
      height: 600,
    }, 
    signout: {
      marginTop: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colRef } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { userRefid } from './LoginScreen'
import { onSnapshot, query, where, collection } from 'firebase/firestore'
import Home from '../components/Home'

let data;
const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  console.log(userRefid);
  const navigation = useNavigation();
  const q = query(colRef, where("id", "==", userRefid));

  useEffect(() => onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      data = doc.data().name
      setIsLoading(false);
    })
  }),[]);
  
  return (
    <View style={styles.container}>
      {
        isLoading ? <View><Text>LOADING</Text></View> : // TO SETUP LOADING THINGY
        <Home name={data} />
      }
    </View>
  )

}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
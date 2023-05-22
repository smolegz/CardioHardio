import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import {doc, updateDoc} from "firebase/firestore";
import { userRefid } from './LoginScreen';
import { useAuth, setupProfile } from '../firebase';
import Welcome from '../assets/welcome.svg'

const DetailsScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const userRef = doc(db, "users", userRefid); 
    const currentUser = useAuth();

    const handleName = () => {

        const userData = async () => {
            const snap = await updateDoc(userRef, {name: name, id: userRefid});
            return snap;
        }
        
        
        userData()
        .then((snap) => {
            setupProfile(currentUser, name, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
            navigation.replace("Welcome Home");
        })
       
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style = {styles.inputContainer}>
                <Welcome width='250' height='250'/>
                <Text style={styles.title}>Enter your name :</Text>
                <TextInput
                    placeholder = "Name"
                    value = { name }
                    onChangeText = {text => setName(text)}
                    style= {styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleName}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )





}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffff',
    },
    title: {
        fontSize: 20,
        fontFamily: 'FiraSans_300Light',
        marginBottom: 20,
        fontWeight: 400,
        color: '#212A3E',
    },
    inputContainer: {
        width: "70%",
        justifyContent: 'center',
        alignItems:'center',
    },
    input: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16, 
        width: '100%'  
    },
    buttonContainer: {
        marginTop: '10%',
        width: '40%',
    },
    button: {
        backgroundColor: '#212A3E',
        width: '100%',
        marginBottom: 10,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'FiraSans_400Regular_Italic'
    }
})
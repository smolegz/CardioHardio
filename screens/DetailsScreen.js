import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import {doc, updateDoc} from "firebase/firestore";
import { userRefid } from './LoginScreen';

const DetailsScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const userRef = doc(db, "users", userRefid); 

    const handleName = () => {
        
        const userData = async () => {
            const snap = await updateDoc(userRef, {name: name, id: userRefid});
        }
        userData().then(() => navigation.replace("Welcome Home"))
       
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Enter your name :</Text>
            <View style = {styles.inputContainer}>
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
        backgroundColor: 'black'
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 400,
        color: 'white',
    },
    inputContainer: {
        width: "70%",
    },
    input: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: '10%',
        width: '40%',
    },
    button: {
        backgroundColor: '#FF99FF',
        width: '100%',
        marginBottom: 10,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    }
})
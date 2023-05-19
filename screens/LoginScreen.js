import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { fireAuth, db, colRef } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, where} from "firebase/firestore";

let userRefid;
const LoginScreen = () => { 
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const navigation = useNavigation();
    

    const createUserProfile = async (userAuth) => {
        if (!userAuth) return;
        const createdAt = new Date();

        const userRef = await addDoc(collection(db, "users"), {
            userEmail: email,
            createdAt: createdAt,
            name: null
        });
        userRefid = userRef.id;
        return userRef;
    }

	const handleSignUp = () => {
		createUserWithEmailAndPassword(fireAuth, email, password)
		.then(userCredentials => {
			const user = userCredentials.user;
			console.log("Successfully signed up: ", user.email);
            createUserProfile(userCredentials);
            alert("Successful");
            
		})
        .then(() => {
            navigation.replace("Details")
          })
		.catch(error => alert(error.message))
	}

    const handleLogin = () => {
        signInWithEmailAndPassword(fireAuth, email, password)
        .then(userCredentials => {
			const user = userCredentials.user;
			console.log("Logged in into: ", user.email);
            const q = query(colRef, where("userEmail", "==", user.email))
            onSnapshot(q, (snapshot) => {
                snapshot.docs.forEach((doc) => userRefid = doc.data().id)
            });
		})
        .then(() => {
            navigation.replace("Welcome Home")
          })
		.catch(error => alert(error.message))
    }

	return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.titleContainer}>
            <Text style={styles.title}> CardioHARDio</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder = "Email"
                value = { email }
                onChangeText = {text => setEmail(text)}
                style= {styles.input}
            />
        
            <TextInput
                placeholder = "Password"
                value = { password }
                onChangeText = {text => setPassword(text)}
                style= {styles.input}
                secureTextEntry
            />        
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress= {handleLogin}
                style= {styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress= {handleSignUp}
                style= {[styles.button, styles.buttonOutline]}
            >
            <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
   </KeyboardAvoidingView>
  )
}

export {userRefid};
export default LoginScreen

const styles = StyleSheet.create({
    titleContainer: {
        paddingBottom: 50,
        paddingTop: 30,
    },
    title: {
        fontFamily: 'PassionOne_700Bold',
        letterSpacing: 1,
        fontSize: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: '5%',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        marginBottom: 10,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
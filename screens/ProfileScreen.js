import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../firebase'
import { useState, useEffect } from 'react'
import {updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { userRefid } from './LoginScreen';


//create a go back page. --navigates to homescreen.
// save button --writes to firebase

const ProfileScreen = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [nameError, setnameError] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const currentUser = useAuth();
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

    const userRef = doc(db, "users", userRefid); 
    
    useEffect(() => {
        setName(currentUser?.displayName)
        setEmail(currentUser?.email)
    },[currentUser])

    //Changing in auth
    const onSave = async () => {
        updateEmail(currentUser, email);
        await updateProfile(currentUser, {
            displayName: name,
        })

        updateDoc(userRef, {name: name, userEmail: email});
    
        if (password !== '') {
            updatePassword(currentUser, password);
        }

    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} disabled={isSaving} style={styles.back}>
                <Text style={{textAlign:'center', fontFamily: 'FiraSans_300Light', color: 'white'}}>Go Back</Text>
            </TouchableOpacity>

            <Text style={{fontFamily: 'FiraSans_700Bold', fontSize: 30, marginTop: 30, letterSpacing: 0.5}}>PROFILE</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>*Name:</Text>
                <TextInput style={[styles.input, isSaving ? styles.saving: null]} placeholder={"Enter name"} defaultValue={name} value={name} onChangeText={text => setName(text)} clearButtonMode='always' readOnly= {isSaving} />
                {!!nameError && (
                <Text style={{ color: "red" }}>{nameError}</Text>
                )}

                <Text style={styles.label}>*Email:</Text>
                <TextInput style={[styles.input, isSaving ? styles.saving: null]} placeholder={"Enter email"} defaultValue={email} value={email} onChangeText={text => setEmail(text.trim())} clearButtonMode='always' readOnly= {isSaving} />
                {!!emailError && (
                <Text style={{ color: "red" }}>{emailError}</Text>
                )}
                
                <Text style={styles.label}>New Password (optional):</Text>
                <TextInput style={[styles.input, isSaving ? styles.saving: null]} value={password} onChangeText={text => setPassword(text)} clearButtonMode='always' secureTextEntry='true' readOnly= {isSaving} />

                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput style={[styles.input, isSaving ? styles.saving: null]} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} clearButtonMode='always' secureTextEntry={true} readOnly= {isSaving} />
                <Text style={{ color: "red" }}>{passwordError}</Text>
                
            </View>

            <TouchableOpacity style={styles.save} disabled={isSaving} onPress={() => {
                if (name === "") {
                    setnameError("*Required field");
                } else if (email === "") {
                    setemailError("*Required field");
                } else if (confirmPassword !== password) {
                    setPasswordError("*Password mismatch, please check.")
                } else {
                    setIsSaving(true);
                    setemailError();
                    setnameError();
                    setPasswordError();
                    onSave().then(() => navigation.navigate("Welcome Home"));
                }
            }}>
                <Text style={{textAlign:'center', fontFamily: 'FiraSans_300Light', color: 'white'}}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginTop: '15%',
    },
    input: {
        width: '95%',
        padding: 15,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 5
    },
    label: {
        fontSize: 15,
        marginLeft: 5,
        marginTop: 20,
        fontFamily: 'FiraSans_300Light'
    },
    formContainer: {
        marginTop: 10,
    },
    back:{
        borderWidth: 1,
        borderRadius: 20,
        width: '20%',
        padding: 10,
        backgroundColor: '#212A3E',
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: 'grey',
        backgroundColor: '#212A3E',
    },
    save: {
        marginTop: 60,
        borderWidth: 0.9,
        borderRadius: 20,
        marginLeft: '75%',
        padding: 10,
        width: '20%',
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: 'grey',
        backgroundColor: '#212A3E',
    },
    saving: {
        borderColor: '#33cc33',
        borderWidth: 2,
    }
})

export default ProfileScreen;
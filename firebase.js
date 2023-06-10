import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import { useEffect, useState } from 'react';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcVtckd1tAUHiWcIvXIorBN6uOXTWKoDA",
  authDomain: "cardiohardio-6dbc7.firebaseapp.com",
  projectId: "cardiohardio-6dbc7",
  storageBucket: "cardiohardio-6dbc7.appspot.com",
  messagingSenderId: "363762702221",
  appId: "1:363762702221:web:267ce56ee96124d27b8fc4",
  measurementId: "G-K982FE9FLR",
};

let firebaseApp;
let fireAuth;
if (getApps().length < 1) {
  firebaseApp = initializeApp(firebaseConfig);
  fireAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebaseApp = getApp();
  fireAuth = getAuth();
}

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(fireAuth.currentUser);
  }, [currentUser])

  return currentUser;
}

const setupProfile = (user, name, photoURL) => {
  updateProfile(user,{
    displayName: name,
    photoURL: photoURL
  }).then(() => console.log("Updated Profile")).catch((error) => console.log("Failed to update profile"))
}

const db = getFirestore(firebaseApp);

const colRef = collection(db, "users");

const storage = getStorage(firebaseApp);

export {fireAuth, db, colRef, useAuth, setupProfile};
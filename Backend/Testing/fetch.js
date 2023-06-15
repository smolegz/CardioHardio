import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Queried field
export async function fetchAll() {
    const firebaseConfig = {
        apiKey: "AIzaSyDcVtckd1tAUHiWcIvXIorBN6uOXTWKoDA",
        authDomain: "cardiohardio-6dbc7.firebaseapp.com",
        databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com",
        projectId: "cardiohardio-6dbc7",
        storageBucket: "cardiohardio-6dbc7.appspot.com",
        messagingSenderId: "363762702221",
        appId: "1:363762702221:web:267ce56ee96124d27b8fc4",
        measurementId: "G-K982FE9FLR"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    };
    
    const db = firebase.firestore();
    
    const fetchAllFun = () => {
        useEffect(async () => {
            const docRef = db.collection('UserData');
            const docSnapshot = await docRef.get();
            
            // Array of all datas
            const data = [];
            docSnapshot.forEach(doc => {
                const docData = doc.data();
                const entry = {
                    date: doc.id,
                    bmi: docData.bmi,
                };
                data.push(entry);
            });
            return data;
        }, []);
    }
    return fetchAllFun;
}

// Queried field and date
export async function fetchOne(queried, date) {
    const firebaseConfig = {
        apiKey: "AIzaSyDcVtckd1tAUHiWcIvXIorBN6uOXTWKoDA",
        authDomain: "cardiohardio-6dbc7.firebaseapp.com",
        databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com",
        projectId: "cardiohardio-6dbc7",
        storageBucket: "cardiohardio-6dbc7.appspot.com",
        messagingSenderId: "363762702221",
        appId: "1:363762702221:web:267ce56ee96124d27b8fc4",
        measurementId: "G-K982FE9FLR"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    };
    
    const db = firebase.firestore();

    const fetchOneFun = () => {
        useEffect(async () => {
            const docRef = db.collection('UserData').doc(date);
            const docSnapshot = await docRef.get();
            if (docSnapshot.exists) { 
                const enquiry = queried;
                return docSnapshot.get(enquiry);
            }
        }, []);
    }
    return fetchOneFun;
}
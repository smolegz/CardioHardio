import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import admin from "firebase-admin";
import serviceAccount from "/Users/matchaboii/CardioHardio/serviceAccountKey.json" assert { type: 'json'};
import { getFirestore } from 'firebase-admin/firestore';

// Queried field
export async function fetchAll(queried) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com"
        });

        const db = getFirestore();
        const docRef = db.collection('UserData');
        const docSnapshot = await docRef.get();
        
        if (docSnapshot.exists) {
            const allField = [];
            docSnapshot.forEach((doc) => {
                const field = doc.data();
                if (field.hasOwnProperty(queried)) {
                    allField.push(field[queried])
                }
            });
            return allField;
        } else {
            console.log('Doc not found');
        }
        
    } catch (error) {
        console.error('Cannot obtain data', error);
    }
}

// Queried field and date
export async function fetchOne(queried, date) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com"
        });

        const db = getFirestore();
        const docRef = db.collection('UserData').doc(date);
        const docSnapshot = await docRef.get();
        
        if (docSnapshot.exists) {
            const field = docSnapshot.data();
            const fieldValue = field[queried];
            return fieldValue;
        } else {
            console.log('Doc not found');
        }
    } catch (error) {
        console.error('Cannot obtain data', error);
    }
}
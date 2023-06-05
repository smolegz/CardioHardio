const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser');
const fs = require('fs');
const knnClassifier = require("@tensorflow-models/knn-classifier");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// Initalise server
var admin = require("firebase-admin");
var serviceAccount = require("/Users/matchaboii/CardioHardio/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com"
});

const db = getFirestore();

// Ask for input
async function promptInput() {
    const readline = require('node:readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter weight: ', (weight) => {
        rl.question('Enter height: ', (height) => {
            rl.question('Do you smoke? ', (smoking) => {
                rl.question('Do you consume alcohol? ', (alcohol) => {
                    rl.question('What is your gender? ', (gender) => {
                        rl.question('Enter your age: ', (age) => {
                            rl.question('How much do you exercise today? ', (activity) => {
                                const userData = {
                                    bmi: Number(weight / Math.pow(height/100,2)),
                                    smoking: Number(smoking),
                                    alcohol: Number(alcohol),
                                    gender: Number(gender),
                                    age: Number(age),
                                    activity: Number(activity),
                                };
                                addDataToFirebase(userData);

                                rl.close();
                            });
                        });
                    });
                });
            });
        });
    });
}

// Add data to firebase
async function addDataToFirebase(userData) {
    try {
        db.collection('UserData').doc(new Date().toJSON().slice(0,10)).set(userData);
        console.log('Added');
    } catch (error) {
        console.error('Error!', error);
    }
}

// Fetch data from firebase
async function getData() {
    try {
        const docRef = db.collection('UserData').doc(new Date().toJSON().slice(0,10));
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            const docFields = docSnapshot.data();
            const fieldsArr = Object.values(docFields);

            return fieldsArr;
        } else {
            console.log('Doc not found');
            return [];
        }
    } catch (error) {
        console.error('Cannot obtain data', error);
        return [];
    }
}

// To load CSV file
function loadCSV(filePath) {
    const dataset = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => dataset.push(data))
            .on('end', () => {
                resolve(dataset);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

//Convert CSV data to tensor
function convertToTensors(data) {
    const features = [];
    const labels = [];

    data.forEach((row) => {
        features.push([
            Number(row.PhysicalActivity),
            Number(row.Age),
            Number(row.AlcoholDrinking),
            Number(row.BMI),
            Number(row.Sex),
            Number(row.Smoking),
        ]);
        labels.push(Number(row.HeartDisease));
    });

    const featureTensor = tf.tensor2d(features);
    const labelTensor = tf.tensor1d(labels);
    return {features: featureTensor, labels: labelTensor};
}

// Normalise features
function normaliseData(data) {
    const featureTensor = data.features;
    const labelTensor = data.labels;

    const { mean, variance } = tf.moments(featureTensor, 0);
    const normalisedFeatures = featureTensor.sub(mean).div(variance.sqrt());

    return { features: normalisedFeatures, labels: labelTensor};
}

// Logistic Regression
async function performLogisticRegresion(filePath) {
    const rawData = await loadCSV(filePath);
    const data = convertToTensors(rawData);
    const normalisedData = normaliseData(data);

    const model = tf.sequential();
    model.add(tf.layers.dense( {
        units:1,
        inputShape: [6],
        activation: 'sigmoid'
    }));
    model.compile({
        optimizer: tf.train.adam(),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    const { features, labels } = normalisedData;
    await model.fit(features, labels, {epochs: 1, shuffle: true});
    
    // Bug: getData and promptInput running async
    await promptInput();
    await getData();
    //Model testing
    // Input: Activity, age, alcohol, BMI, sex, smoking
    const fieldsArr = getData();
    fieldsArr.then(function(arr) {
        const testInput = tf.tensor2d([arr]);
        const prediction = model.predict(testInput);
        const predictedValue = prediction.round().dataSync()[0];

        console.log('Stroke:', predictedValue);
    })
}

const filePath = '/Users/matchaboii/CardioHardio/MachineLearning/Datasets/HealthData.csv';
performLogisticRegresion(filePath);

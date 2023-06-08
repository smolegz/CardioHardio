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
async function promptInput(question) {
    const readline = require('node:readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question(question, (input) => {
            resolve(input);
            rl.close();
        });
    });
}

async function getUserInput() {
    const weight = await promptInput('Enter weight: ');
    const height = await promptInput('Enter height: ');
    const smoke = await promptInput('Do you smoke? ');
    const alcohol = await promptInput('Do you drink alcohol? ');
    const gender = await promptInput('What is your gender? ');
    const age = await promptInput('Enter age: ');
    const exercise = await promptInput('Do you exercise? ');
    const bp = await promptInput('Input blood pressure: ');

    const userData = {
        weight: Number(weight),
        height: Number(height),
        smoking: Number(smoke),
        alcohol: Number(alcohol),
        gender: Number(gender),
        age: Number(age),
        activity: Number(exercise),
        bp: Number(bp)
    };
    addDataToFirebase(userData);
    await delay(5000);
    getData();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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
            const { alcohol, gender, activity, smoking, age, weight, height } = docFields;
            const BMI = weight / Math.pow( height / 100, 2);
            const fieldsArr = [ alcohol, gender, activity, smoking, age, BMI];

            console.log(fieldsArr);
            return fieldsArr;
            // const fieldsArr = Object.values(docFields);
            // console.log(fieldsArr);
            // return fieldsArr;
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
            Number(row.AlcoholDrinking),
            Number(row.Sex),
            Number(row.PhysicalActivity),
            Number(row.Smoking),
            Number(row.Age),
            Number(row.BMI),
        ]);
        labels.push(Number(row.HeartDisease));
    });

    const featureTensor = tf.tensor2d(features);
    const labelTensor = tf.oneHot(labels, 2);
    return {features: featureTensor, labels: labelTensor};
}

// Logistic Regression
async function performLogisticRegresion(filePath) {
    await getUserInput();

    const rawData = await loadCSV(filePath);
    const data = convertToTensors(rawData);

    // Normalise Data
    const featureTensor = data.features;
    const labels = data.labels;
    const { mean, variance } = tf.moments(featureTensor, 0);
    const features = featureTensor.sub(mean).div(variance.sqrt());

    // Machine Learning
    const model = tf.sequential();

    // Sigmoid for binary result
    model.add(tf.layers.dense( {
        units:2,
        inputShape: [6],
        activation: 'sigmoid'
    }));

    model.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    await model.fit(features, labels, {
        epochs: 2, 
        batchSize: 32, 
        shuffle: true,
    });
    
    //Model testing
    const fieldsArr = getData();
    fieldsArr.then(function(arr) {
        const dataFetch = tf.tensor2d([arr]);

        // Normalise User Data
        const testData = dataFetch.sub(mean).div(variance.sqrt());
        
        const prediction = model.predict(testData);
        const predictedArray = prediction.arraySync();
        const result = predictedArray.map((prediction) => (prediction[0] < 0.8 ? 1 : 0));
        
        if (result[0] == 0) {
            console.log('Heart Disease not predicted');
        } else {
            console.log('Heart Disease predicted');
        };
    });
}

// const filePath = '/Users/matchaboii/CardioHardio/MachineLearning/Datasets/HealthData.csv';
// performLogisticRegresion(filePath);
getUserInput();
const tf = require('@tensorflow/tfjs');
const { readFile }= require('react-native-fs');
const Papa = require('papaparse');
const { getFirestore } = require('firebase-admin/firestore');

// Logistic Regression Function
async function logisticRegression(dateQueried) {
    // Fetch Data from Firestore
    const userData = await getDataForLR(dateQueried);

    // load CSV file
    const filePath = '/Users/matchaboii/Desktop/testrun/HealthData.csv';
    const csvData = await readFile(filePath);
    const parsedData = Papa.parse(csvData, { header: true}).data;
    const features = parsedData.map(row => [
        parseInt(row.AlcoholDrinking),
        parseInt(row.Sex),
        parseInt(row.PhysicalActivity),
        parseInt(row.Smoking),
        parseInt(row.Age),
        parseFloat(row.BMI)
    ]);
    const labels = parsedData.map(row.HeartDisease);
    const featureTensor = tf.tensor2d(features);
    const labelTensor = tf.oneHot(labels, 2);
    
    // Normalise Data
    const { mean, variance } = tf.moments(featureTensor, 0);
    const featuresTest = featureTensor.sub(mean).div(variance.sqrt());
        
    // Machine Learning
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 2,
        inputShape: [6],
        activation: 'sigmoid'
    }));
    model.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });
    model.fit(featuresTest, labelTensor, {
        epochs: 1,
        batchSize: 64,
        shuffle: true,
    });
    
    // Prediction using userData
    const dataPredict = tf.tensor2d([userData]);
    const normalisePredict = dataPredict.sub(mean).div(variance.sqrt());
    const prediction = model.predict(normalisePredict);
    const predictedArray = prediction.arraySync();
        
    if (predictedArray[0] < 0.8) {
        console.log('Heart Disease predicted');
    } else {
        console.log('Heart Disease not predicted');
    };
}

async function getDataForLR(dateQueried) {
    try {
        // Initalise Server
        var admin = require("firebase-admin");
        var serviceAccount = require("/Users/matchaboii/CardioHardio/serviceAccountKey.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com"
        });
        
        const db = getFirestore();
        const docRef = db.collection('UserData').doc(dateQueried);
        const docSnapshot = await docRef.get();
        
        if (docSnapshot.exists) {
            const docFields = docSnapshot.data();
            const { alcohol, gender, activity, smoking, age, weight, height } = docFields;
            const BMI = weight / Math.pow( height / 100, 2);
            const fieldsArr = [ alcohol, gender, activity, smoking, age, BMI];

            return fieldsArr;
        } else {
            console.log('Doc not found');
            return [];
        }
    } catch (error) {
        console.error('Cannot obtain data', error);
    }
} 

logisticRegression('2023-06-07');

module.exports = { logisticRegression };
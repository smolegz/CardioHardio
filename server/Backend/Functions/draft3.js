const tf = require('@tensorflow/tfjs-node');
const Papa = require('papaparse');
const { getFirestore } = require('firebase-admin/firestore');
const { doc, getDoc } = require("firebase/firestore");

// Logistic Regression Function
async function logisticRegression(dateQueried) {
    // Fetch Data from Firestore
    const userData = await getDataForLR(dateQueried);

    // load CSV file
    const filePath = "https://firebasestorage.googleapis.com/v0/b/cardiohardio-6dbc7.appspot.com/o/HealthDataTest.csv?alt=media&token=576723b8-24fb-4840-ba3f-ffff7d817317";

    const parseCSV = async () => {
        const response = await fetch(filePath);
        const csvData = await response.text();
        const { data } = Papa.parse(csvData, { header: true });

        const features = data.map((row) => [
            parseInt(row.AlcoholDrinking),
            parseInt(row.Sex),
            parseInt(row.PhysicalActivity),
            parseInt(row.Smoking),
            parseInt(row.Age),
            parseFloat(row.BMI),
        ]);

        const labels = data.map((row) => parseInt(row.HeartDisease));
        console.log(features);
        const featureTensor = tf.tensor2d(features);
        const labelTensor = tf.oneHot(labels, 2);
        
        return { featureTensor, labelTensor };
    }

    const {featureTensor, labelTensor} = await parseCSV();
    
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
    await model.fit(featuresTest, labelTensor, {
        epochs: 1,
        batchSize: 32,
        shuffle: true,
    });
    
    // Prediction using userData
    const dataPredict = tf.tensor2d([userData]);
    const normalisePredict = dataPredict.sub(mean).div(variance.sqrt());
    const prediction = model.predict(normalisePredict);
    const predictedArray = prediction.arraySync();
        
    if (predictedArray[0] < 0.8) {
        console.log('Heart Disease predicted', predictedArray);
    } else {
        console.log('Heart Disease not predicted', predictedArray);
    };
}

async function getDataForLR(dateQueried) {
    try {

        var admin = require("firebase-admin");
        console.log("here");

        var serviceAccount = require("../../../client/serviceAccountKey.json");
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cardiohardio-6dbc7-default-rtdb.firebaseio.com"
          });

        const db = getFirestore();
        const docRef = doc(db, "UserData", dateQueried);
        const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists) {
        const docFields = docSnapshot.data();
        const { alcohol, gender, activity, smoking, age, weight, height } =
          docFields;
        const BMI = weight / Math.pow(height / 100, 2);
        const fieldsArr = [alcohol, gender, activity, smoking, age, BMI];
        return fieldsArr;
      } else {
        console.log("Doc not found");
        return [];
      }
    } catch (error) {
      console.error("Cannot obtain data", error);
    }
  }

// logisticRegression('2023-06-07');
getDataForLR('2023-06-07');
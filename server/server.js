const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser');
const fs = require('fs');
const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');

// Logistic Regression Function
async function logisticRegression(userData) {
    
    // Fetch Data from Firestore
    // const userData = await getDataForLR(dateQueried);

    // Load CSV file
    const dataset = [];
    const data = await new Promise((resolve, reject) => {
        fs.createReadStream('./Backend/Datasets/HealthData.csv')
            .pipe(csv())
            .on('data', (data) => dataset.push(data))
            .on('end', () => {
                resolve(dataset);
            })
            .on('error', (error) => {
                reject(error);
            });
    });

    // Convert CSV to Tensor 
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
        batchSize: 64,
        shuffle: true,
    });

    // Prediction using userData
    const dataPredict = tf.tensor2d([userData]);
    const normalisePredict = dataPredict.sub(mean).div(variance.sqrt());
    const prediction = model.predict(normalisePredict);
    const predictedArray = prediction.arraySync();
    console.log(userData);
    if (predictedArray[0][0] < 0.9) {
        console.log('Heart Disease predicted', predictedArray[0][0]);
        return 1;
    } else {
        console.log('Heart Disease not predicted', predictedArray[0][0]);
        return 0;
    };
}

const app = express();
const PORT = 8000;

app.get('/predict', async (req, res) => {
    const { AlcoholDrinking, Sex, PhysicalActivity, Smoking, Age, Weight, Height } = req.query;
    const userData = [
        parseFloat(AlcoholDrinking), 
        parseFloat(Sex), 
        parseFloat(PhysicalActivity),
        parseFloat(Smoking), 
        parseFloat(Age),
        parseFloat(Weight/((Height/100) ** 2))
    ];
    const prediction = await logisticRegression(userData);

    res.json({prediction});
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8000');
});

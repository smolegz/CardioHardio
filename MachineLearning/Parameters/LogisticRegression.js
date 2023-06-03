const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser');
const fs = require('fs');
const knnClassifier = require("@tensorflow-models/knn-classifier");

//To load CSV file
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
            Number(row.BMI),
            Number(row.Smoking),
            Number(row.AlcoholDrinking),
            Number(row.Sex),
            Number(row.Age),
            Number(row.PhysicalActivity),
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

    //Model testing
    const testInput = tf.tensor2d([[18,0,0,0,23,1]]);
    const prediction = model.predict(testInput);
    const predictedValue = prediction.round().dataSync()[0];

    console.log('Stroke:', predictedValue);
}

const filePath = '/Users/matchaboii/CardioHardio/MachineLearning/Datasets/HealthData.csv';
performLogisticRegresion(filePath);
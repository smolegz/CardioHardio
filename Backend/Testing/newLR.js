import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Logistic Regression Function
export async function logisticRegression(dateQueried) {
  // Fetch Data from Firestore
  const userData = await getDataForLR(dateQueried);

  // load CSV file
  // previously the link provided doesnt work, so I change to this link instead.
  const filePath =
    "https://firebasestorage.googleapis.com/v0/b/cardiohardio-6dbc7.appspot.com/o/HealthData.csv?alt=media&token=ef919b29-bb80-4f57-b3d8-21c81bd09b82";

  // parse CSV
  const parseCSV = async () => {
    const response = await fetch(filePath);

    const csvData = await response.text();

    const { data } = Papa.parse(csvData, { header: true });
    console.log("Done");
    return data;
  };

  const csvData = await parseCSV();

  const features = csvData.map((row) => [
    parseInt(row.AlcoholDrinking),
    parseInt(row.Sex),
    parseInt(row.PhysicalActivity),
    parseInt(row.Smoking),
    parseInt(row.Age),
    parseFloat(row.BMI),
  ]);

  //console.log(features)

  const labels = csvData.map((row) => row.HeartDisease);
  console.log("3");
  const featureTensor = tf.tensor2d(features); // Crashes at here
  console.log("4");
  const labelTensor = tf.oneHot(labels, 2);

  // Normalise Data
  const { mean, variance } = tf.moments(featureTensor, 0);
  const featuresTest = featureTensor.sub(mean).div(variance.sqrt());

  // Machine Learning
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 2,
      inputShape: [6],
      activation: "sigmoid",
    })
  );
  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
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
    console.log("Heart Disease predicted");
  } else {
    console.log("Heart Disease not predicted");
  }
}

async function getDataForLR(dateQueried) {
  try {
    console.log("1");
    const docRef = doc(db, "UserData", dateQueried);
    console.log("2");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists) {
      console.log("Doc exists");
      const docFields = docSnapshot.data();
      const { alcohol, gender, activity, smoking, age, weight, height } =
        docFields;
      const BMI = weight / Math.pow(height / 100, 2);
      const fieldsArr = [alcohol, gender, activity, smoking, age, BMI];
      console.log("Fields ARRAY:", fieldsArr);
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

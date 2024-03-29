import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Logistic Regression Function
export async function logisticRegression(dateQueried) {
  try {
    // Fetch Data from Firestore
    const userData = await getDataForLR(dateQueried);

    // load CSV file
    // previously the link provided doesnt work - shows everything as NaN, so I've changed to this link instead.
    const filePath =
      "https://firebasestorage.googleapis.com/v0/b/cardiohardio-6dbc7.appspot.com/o/HealthDataTest.csv?alt=media&token=576723b8-24fb-4840-ba3f-ffff7d817317";

    // parse CSV
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

      const featureTensor = tf.tensor2d(features);

      const labelTensor = tf.oneHot(labels);
      return { featureTensor, labelTensor };
    };
  } catch (error) {
    console.log("Error: ", error);
  }

  try {
    const { featureTensor, labelTensor } = await parseCSV();

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

    await model.fit(featureTensor, labelTensor, {
      epochs: 1,
      batchSize: 64,
      shuffle: true,
    });

    // Prediction using userData
    const dataPredict = tf.tensor2d([userData]);
    const prediction = model.predict(dataPredict);
    const predictedArray = prediction.arraySync();

    if (predictedArray[0] < 0.8) {
      console.log("Heart Disease predicted");
    } else {
      console.log("Heart Disease not predicted");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getDataForLR(dateQueried) {
  try {
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

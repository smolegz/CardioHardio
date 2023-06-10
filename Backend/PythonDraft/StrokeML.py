# Importing Dependencies
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from DataCollection import strokedata

# Data Collection and Processing
# loading csv data
stroke_data = pd.read_csv('/Users/matchaboii/Desktop/Orbital/Data/StrokeData.csv')

strokeX = stroke_data.drop(columns='Stroke', axis=1)
strokeY = stroke_data['Stroke']

# Split data into Training and Test
# Stratify: split X test data equally between Yes and No
strokeX_train, strokeX_test, strokeY_train, strokeY_test = \
    train_test_split(strokeX, strokeY, test_size=0.2, stratify=strokeY, random_state=3)

# Model Training
# Logistic Regression model
model = LogisticRegression()


# Training model with Training Data
model.fit(strokeX_train, strokeY_train)

# Accuracy Score
# accuracy on training data
strokeX_train_prediction = model.predict(strokeX_train)
training_data_accuracy = accuracy_score(strokeX_train_prediction, strokeY_train)

# print("Accuracy on Training data: ", training_data_accuracy)

# accuracy on test data
strokeX_test_prediction = model.predict(strokeX_test)
test_data_accuracy = accuracy_score(strokeX_test_prediction, strokeY_test)

# print("Accuracy on Test data: ", test_data_accuracy)

# Predictive System for Heart Disease
# BMI, smoking, alcohol, sex, age
input_data = strokedata

# change input data to numpy array
input_numpy = np.asarray(input_data)

# reshaping to predict only one
input_reshape = input_numpy.reshape(1, -1)

strokePrediction = model.predict(input_reshape)


# Importing Dependencies
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Data Collection and Processing
# loading csv data
bp_data = pd.read_csv('/Users/matchaboii/PycharmProjects/CardioHardio/Machine Learning/Datasets/RestingBP.csv')

bpX = bp_data.drop(columns='HeartDisease', axis=1)
bpY = bp_data['HeartDisease']

# Split data into Training and Test
# Stratify: split X test data equally between Yes and No
bpX_train, bpX_test, bpY_train, bpY_test = train_test_split(bpX, bpY, test_size=0.2, stratify=bpY, random_state=17)

# Model Training
# Logistic Regression model
model = LogisticRegression()

# Training model with Training Data
model.fit(bpX_train, bpY_train)

# Accuracy Score
# accuracy on training data
bpX_train_prediction = model.predict(bpX_train)
training_data_accuracy = accuracy_score(bpX_train_prediction, bpY_train)

print("Accuracy on Training data: ", training_data_accuracy)

# accuracy on test data
bpX_test_prediction = model.predict(bpX_test)
test_data_accuracy = accuracy_score(bpX_test_prediction, bpY_test)

print("Accuracy on Test data: ", test_data_accuracy)

# Predictive System for Heart Disease
# Age, Sex, RestingBP
input_data = (49, 0, 160)

# change input data to numpy array
input_numpy = np.asarray(input_data)

# reshaping to predict only one
input_reshape = input_numpy.reshape(1, -1)

prediction = model.predict(input_reshape)

if (prediction[0] == 0):
    print("Heart Disease is NOT predicted")
else:
    print("Heart Disease predicted!")
# Importing Dependencies
import time
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Data Collection and Processing
# loading csv data
health_data = pd.read_csv('/Users/matchaboii/Desktop/Orbital/Data/HealthData.csv')

mainX = health_data.drop(columns='HeartDisease', axis=1)
mainY = health_data['HeartDisease']

# Split data into Training and Test
# Stratify: split X test data equally between Yes and No
mainX_train, mainX_test, mainY_train, mainY_test = train_test_split(mainX, mainY, test_size=0.1, stratify=mainY, random_state=3)

# Model Training
# Decision Tree Classifier
st1 = time.time()
modelDTC = DecisionTreeClassifier()

# Training model with Training Data
modelDTC.fit(mainX_train, mainY_train)

# Accuracy Score
# accuracy on training data
mainX_train_prediction = modelDTC.predict(mainX_train)
training_data_accuracy = accuracy_score(mainX_train_prediction, mainY_train)
print("Based on Decision Tree Classifier")
print("Accuracy on Training data: ", training_data_accuracy)

# accuracy on test data
mainX_test_prediction = modelDTC.predict(mainX_test)
test_data_accuracy = accuracy_score(mainX_test_prediction, mainY_test)

print("Accuracy on Test data: ", test_data_accuracy)
et1 = time.time()
print("Execution time:", et1 - st1, "seconds")
print()

# Model Training
# Logistic Regression
st2 = time.time()
modelLR = LogisticRegression()

# Training model with Training Data
modelLR.fit(mainX_train, mainY_train)

# Accuracy Score
# accuracy on training data
mainX_train_prediction = modelLR.predict(mainX_train)
training_data_accuracy = accuracy_score(mainX_train_prediction, mainY_train)
print("Based on Logistic Regression")
print("Accuracy on Training data: ", training_data_accuracy)

# accuracy on test data
mainX_test_prediction = modelLR.predict(mainX_test)
test_data_accuracy = accuracy_score(mainX_test_prediction, mainY_test)

print("Accuracy on Test data: ", test_data_accuracy)
et2 = time.time()
print("Execution time:", et2 - st2, "seconds")
print()

# Model Training
# Random Forest Classifier
st3 = time.time()
modelRFC = RandomForestClassifier()

# Training model with Training Data
modelRFC.fit(mainX_train, mainY_train)

# Accuracy Score
# accuracy on training data
mainX_train_prediction = modelRFC.predict(mainX_train)
training_data_accuracy = accuracy_score(mainX_train_prediction, mainY_train)
print("Based on Random Forest Classifier")
print("Accuracy on Training data: ", training_data_accuracy)

# accuracy on test data
mainX_test_prediction = modelRFC.predict(mainX_test)
test_data_accuracy = accuracy_score(mainX_test_prediction, mainY_test)

print("Accuracy on Test data: ", test_data_accuracy)
et3 = time.time()
print("Execution time:", et3 - st3, "seconds")

# Predictive System for Heart Disease
# BMI, Smoking, Alcohol, Sex, Age, Physical Activity
input_data = (34.3, 1,1,1,62,0)

# change input data to numpy array
input_numpy = np.asarray(input_data)

# reshaping to predict only one
input_reshape = input_numpy.reshape(1, -1)

prediction = modelLR.predict(input_reshape)

if (prediction[0] == 0):
    print("Heart Disease is NOT predicted")
else:
    print("Heart Disease predicted!")
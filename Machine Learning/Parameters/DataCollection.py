# Data collection
import math
import numpy as np
from datetime import date

gender_input = input("Enter your gender (Male/Female): ")
age = int(input("Enter your age: "))
weight = float(input("Enter your weight (in kg): "))
height = float(input("Enter your height (in cm): "))
smoke_input = input("Are you a smoker? (Yes/No): ")
bloodpressure = int(input("Enter your blood pressure: "))
exercise_input = int(input("Enter duration of moderate intensity aerobic activity each week (in mins): "))
alcohol_input = int(input("How many glasses of alcohol do you consume in a week?: "))
print()
print("Health Summary")

# Gender
if gender_input == "Male":
    gender = 1
elif gender_input == "Female":
    gender = 0

# Smoke
if smoke_input == "Yes":
    smoke = 1
elif smoke_input == "No":
    smoke = 0

# BMI calculator
BMI = round(weight / math.pow(height/100, 2), 2)

print("Your BMI is:", BMI)
if BMI < 18.3:
    print("Your BMI is below recommended BMI of 18.3")
    recweight = round(18.3 * math.pow(height/100, 2),2)
    print("Based on your height, your recommended weight is:", recweight, "kg")
    print("It is", round(recweight - weight,2), "kg more than your current weight")
elif BMI > 22.9:
    print("Your BMI is above recommended BMI of 22.9")
    recweight = round(22.9 * math.pow(height/100, 2),2)
    print("Based on your height, your recommended weight is:", recweight, "kg")
    print("It is", round(weight - recweight,2), "kg less than your current weight")
else:
    print("BMI is in recommended range!")

# Blood Pressure
if bloodpressure > 120:
    print("Your Blood Pressure is above recommended value of 120 mmHg")
else:
    print("Blood Pressure is fine!")

# Physical Activity
if exercise_input < 150:
    exercise = 0
    print("Exercise duration is", 160 - exercise_input, "mins below recommended duration of 150mins per week")
else:
    exercise = 1
    print("Exercise duration is fine!")

# Alcohol
if gender == 1:
    if alcohol_input > 15:
        alcohol = 1
        print("Alcohol consumption is", alcohol_input - 15, "glasses more than recommended amount of 15 glasses!")
    else:
        alcohol = 0
else:
    if alcohol_input > 8:
        alcohol = 1
        print("Alcohol consumption is", alcohol_input - 8, "glasses more than recommended amount of 8 glasses!")
    else:
        alcohol = 0

alldata = [str(date.today()), age, gender, weight, height, smoke, alcohol, bloodpressure, exercise]
heartdata = (BMI, smoke, alcohol, gender, age, exercise)
bpdata = (age, gender, bloodpressure)
strokedata = (BMI, smoke, alcohol, gender, age)

from HeartdiseaseML import *
from BloodpressureML import *
from StrokeML import *

if bpPrediction[0] == 0 and hdPrediction[0] == 0:
    print("Heart Disease is NOT predicted")
else:
    print("Heart Disease predicted!")

if strokePrediction[0] == 0:
    print("Stroke is NOT predicted")
else:
    print("Stroke predicted!")

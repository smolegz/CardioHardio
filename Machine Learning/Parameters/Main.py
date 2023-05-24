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
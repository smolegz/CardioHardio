import math

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("/Users/matchaboii/PycharmProjects/CardioHardio/Machine Learning/Parameters/orbitalhealthdata-firebase-adminsdk-zcm7g-e1bc3fc098.json")
firebase_admin.initialize_app(cred)
firestore_db = firestore.client()

while True:
    print("Please select action:")
    print("1: Add data")
    print("2: Amend data")
    print("3: Delete data")
    print("4: Preview all data")
    print("5: BMI tracker")
    print("6: Quit")
    query = int(input("Enter: "))

    if query == 1:
        from DataCollection import alldata
        doc_ref = firestore_db.collection("HealthData").document(alldata[0])
        doc_ref.set(
            {
                "Age": alldata[1],
                "Gender": alldata[2],
                "Weight": alldata[3],
                "Height": alldata[4],
                "BMI": round(alldata[3] / math.pow(alldata[4]/100, 2), 2),
                "Smoke": alldata[5],
                "Alcohol": alldata[6],
                "BloodPressure": alldata[7],
                "Exercise": alldata[8],
            }
        )
    elif query == 2:
        # Preview all saved data
        coll_ref = firestore_db.collection("HealthData")
        docs = coll_ref.stream()
        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')

        amenddate = input("Which date would you like to amend? (YYYY-MM-DD): ")
        amendquery = int(input("What would you like to amend? 1: Weight, 2: Height, 3: Blood Pressure "))
        if amendquery == 1:
            # Change Weight
            doc_ref = firestore_db.collection("HealthData").document(amenddate)
            change = int(input("New weight in kg: "))
            doc_ref.update({"Weight": change})
            print("Update complete!")
        elif amendquery == 2:
            # Change Height
            doc_ref = firestore_db.collection("HealthData").document(amenddate)
            change = int(input("New height in cm: "))
            doc_ref.update({"Height": change})
            print("Update complete!")
        elif amendquery == 3:
            # Change Blood Pressure
            doc_ref = firestore_db.collection("HealthData").document(amenddate)
            change = int(input("New Blood Pressure Reading: "))
            doc_ref.update({"BloodPressure": change})
            print("Update complete!")
    elif query == 3:
        # Preview all saved data
        coll_ref = firestore_db.collection("HealthData")
        docs = coll_ref.stream()
        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')

        # Query to delete selected data
        deletedate = input("Which date would you like to delete? (YYYY-MM-DD): ")
        doc_ref = firestore_db.collection("HealthData").document(deletedate)
        doc_ref.delete()
        print("Deletion complete!")
    elif query == 4:
        # Preview all saved data
        coll_ref = firestore_db.collection("HealthData")
        docs = coll_ref.stream()
        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')
        print("--End of data--")
    elif query == 5:
        # Get all BMI value from data base
        print("BMI is")
    elif query == 6:
        break




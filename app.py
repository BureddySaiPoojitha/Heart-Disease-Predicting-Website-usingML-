from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  

# Load trained model
model = pickle.load(open("heart_rf_model.pkl", "rb"))

@app.route("/")
def home():
    return "HEALGEN AI Backend Running"

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = [
        data["age"],
        data["currentSmoker"],
        data["prevalentStroke"],
        data["prevalentHyp"],
        data["diabetes"],
        data["totChol"],
        data["sysBP"],
        data["diaBP"],
        data["BMI"],
        data["heartRate"],
        data["glucose"]
    ]

    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][1]

    return jsonify({
        "prediction": int(prediction),
        "risk_probability": float(probability)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
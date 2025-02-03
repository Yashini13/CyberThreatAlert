from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Load Model
with open("iris_model.pkl", "rb") as f:
    model = pickle.load(f)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]
    prediction = model.predict([data])
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    app.run(debug=True, port=5000)

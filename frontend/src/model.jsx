import React, { useState } from "react";
import axios from "axios";

function App() {
  const [features, setFeatures] = useState([5.1, 3.5, 1.4, 0.2]); // Sample input
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/predict", {
        features,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  return (
    <div>
      <h2>ML Model Prediction</h2>
      <p>Enter Features (comma-separated):</p>
      <input
        type="text"
        value={features.join(",")}
        onChange={(e) =>
          setFeatures(e.target.value.split(",").map((num) => parseFloat(num)))
        }
      />
      <button onClick={handlePredict}>Predict</button>
      {prediction !== null && <h3>Prediction: {prediction}</h3>}
    </div>
  );
}

export default App;

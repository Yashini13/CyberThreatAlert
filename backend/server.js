const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error in calling ML model" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Node.js server running on port ${PORT}`));

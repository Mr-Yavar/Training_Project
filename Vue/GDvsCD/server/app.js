// In your Node.js server (Express example)
const express = require("express");
const app = express();
var cors = require('cors')
app.use(express.json());
const fs = require('fs');
app.use(cors({
  origin:"*"
}))

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

const {
  gradientDescentLinearRegression,
  sequentialGradientDescentLinearRegression,
} =require("../src/utils/Regression.js");


app.get("/api/calculate/:R", (req, res) => {
  const {R:d} = req.params;
  const R = Number(d);
  const  x= readJsonFile("../src/assets/dataset/features.json").slice(0,2000);
    const y= readJsonFile("../src/assets/dataset/output.json").slice(0,2000);


  res.json({
    GD: gradientDescentLinearRegression(
      x,
      y,
      R,
      200
    ).mseHistory,
    CD: sequentialGradientDescentLinearRegression(
      x,
      y,
      R,
      200
    ).mseHistory,
  });
});


app.listen(3000, () => console.log("Server running on port 3000"));

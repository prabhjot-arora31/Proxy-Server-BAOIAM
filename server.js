const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// JSON parser
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working....");
});
// Proxy route to handle Google Apps Script request
app.post("/submit-form", async (req, res) => {
  const data = req.body;

  try {
    console.log("data is:", data);
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbx4s1dMZkppjnTgQ1Y7ml9ZI28ySXraFsjJeVThhOKhxeLRiHd908s3rsaoNOZnO1E3/exec",
      data
    );
    console.log("get here");
    res.status(200).json(response.data); // Forward the response to the client
  } catch (error) {
    console.error("Error forwarding the request", error);
    res.status(500).send("Error submitting form");
  }
});
app.post("/contact-form", async (req, res) => {
  const data = req.body;

  try {
    console.log("data is:", data);
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbweV43z0PGUYDSNBVJEfyut-BPPbbKFdQaRNbUevICiRCKPlRVWAVH-Cde_l2GcwPhl/exec",
      data
    );
    console.log("get here (updated)");
    console.log("res is:", response.data);
    res.status(200).json(response.data); // Forward the response to the client
  } catch (error) {
    console.error("Error forwarding the request", error);
    res.status(500).send("Error submitting form");
  }
});
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
module.exports = app;

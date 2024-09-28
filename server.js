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
      "https://script.google.com/macros/s/AKfycby9tY8O7FwZfAzzpArMtBuLWR2uW9AtnloQKNZz5rn7jbC2255IDo_aZbq8vpbq-dc/exec",
      data
    );
    console.log("get here");
    console.log("in submit-form:", response.data);
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
      "https://script.google.com/macros/s/AKfycby0IO6oS_XoQEV_sl6tMsj7-nr_r2A7gc1RA7kOJFwXNoGRwQHyrCQt2GBpYAPKu2YwrA/exec",
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

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Status = require("./status");
const Log = require("./log");
// const rawTurbineData = require("./turbineData");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://JesserHamdaoui:nV7y3DM1lYWQzHGq@learnmangodb001.3pe17pa.mongodb.net/windturbinemonitor",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected");

    // Turbine.insertMany(rawTurbineData)
    //   .then(() => console.log("Raw data inserted successfully"))
    //   .catch((err) => console.log("Error inserting raw data:", err));
    // Status.insertMany([{ name: "Ahla" }])
    //   .then(() => console.log("Raw data inserted successfully"))
    //   .catch((err) => console.log("Error inserting raw data:", err));
  })
  .catch((err) => console.log(err));

app.get("/api/currentStatus", async (req, res) => {
  try {
    // Fetch turbine data from the database
    const status = await Status.find();
    res.json(status);
  } catch (error) {
    console.error("Error fetching status data:", error);
    res.status(500).json({ error: "Failed to fetch status data" });
  }
});

app.get("/api/log", async (req, res) => {
  try {
    const log = await Log.find();
    res.json(log);
  } catch (error) {
    console.error("Error fetching log data:", error);
    res.status(500).json({ error: "Failed to fetch log data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

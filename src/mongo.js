const mongoose = require("mongoose");
const express = require("express");

const Status = require("./status");
const Log = require("./log");
const Report = require("./report");

const app = express();

app.use(express.json());
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
  })
  .catch((err) => console.log(err));

app.get("/api/currentStatus", async (req, res) => {
  try {
    const status = await Status.find({}, { new: false });
    res.json(status);
  } catch (error) {
    console.error("Error fetching status data:", error);
    res.status(500).json({ error: "Failed to fetch status data" });
  }
});

app.get("/api/log", async (req, res) => {
  try {
    const log = await Log.find().sort({ _id: -1 }).limit(7);
    res.json(log);
  } catch (error) {
    console.error("Error fetching log data:", error);
    res.status(500).json({ error: "Failed to fetch log data" });
  }
});

app.get("/api/report", async (req, res) => {
  try {
    const report = await Report.find().sort({ _id: -1 }).limit(7);
    const datetimeArray = report.map((item) => item.dateTime);
    const seriesArray1 = report.map(
      (item) =>
        item.series.find((item) => item.name === "Energy Generated").data
    );
    const seriesArray2 = report.map(
      (item) =>
        item.series.find((item) => item.name === "Energy Consumption").data
    );
    const seriesArray3 = report.map(
      (item) =>
        item.series.find((item) => item.name === "Static Energy Generated").data
    );

    res.json({
      categories: datetimeArray.reverse(),
      series: [
        { name: "Energy Generated", data: seriesArray1.reverse() },
        { name: "Energy Consumption", data: seriesArray2.reverse() },
        { name: "Static Energy Generated", data: seriesArray3.reverse() },
      ],
    });
  } catch (error) {
    console.error("Error fetching report data:", error);
    res.status(500).json({ error: "Failed to fetch report data" });
  }
});

app.get("/api/currentPosition", async (req, res) => {
  try {
    const log = await Log.find().sort({ _id: -1 }).limit(1);
    res.json({ currentAngle: log[0].windDirection });
  } catch (error) {
    console.error("Error fetching current position data:", error);
    res.status(500).json({ error: "Failed to fetch current position data" });
  }
});

app.post("/api/log", async (req, res) => {
  try {
    console.log(req.body);
    req.body._id = new mongoose.Types.ObjectId();
    const newLog = new Log(req.body);
    await newLog.save();
    res.json(newLog);
  } catch (error) {
    console.error("Error creating log:", error);
    res.status(500).json({ error: "Failed to create log" });
  }
});

app.post("/api/currentStatus", async (req, res) => {
  try {
    const previousStatus = await Status.findOne().sort({ _id: -1 });
    // console.log("---->", previousStatus);
    // console.log("---->", req.body);
    const updatedStatus = await Status.findOneAndUpdate({
      windSpeed: req.body.windSpeed,
      windSpeedPercentage:
        (-previousStatus.windSpeed + req.body.windSpeed) /
        previousStatus.windSpeed,

      windDirection: req.body.windDirection,
      windDirectionPercentage:
        (-previousStatus.windDirection + req.body.windDirection) /
        previousStatus.windDirection,

      generatedEnergy: req.body.generatedEnergy,
      generatedEnergyPercentage:
        (-previousStatus.generatedEnergy + req.body.generatedEnergy) /
        previousStatus.generatedEnergy,

      staticEnergy: req.body.staticEnergy,
      staticEnergyPercentage:
        (-previousStatus.staticEnergy + req.body.staticEnergy) /
        previousStatus.staticEnergy,

      alerts: { $push: { alerts: req.body.alerts } },
      new: true,
    });
    res.json(updatedStatus);
  } catch (error) {
    console.error("Error creating status:", error);
    res.status(500).json({ error: "Failed to create status" });
  }
});

app.post("/api/report", async (req, res) => {
  try {
    // console.log(req.body);
    req.body._id = new mongoose.Types.ObjectId();
    const currentDate = new Date();
    req.body.dateTime = currentDate.toISOString();
    const lastReport = await Report.findOne().sort({ _id: -1 });
    const lastSeries1 = lastReport.series.find(
      (item) => item.name === "Energy Generated"
    ).data;
    const lastSeries2 = lastReport.series.find(
      (item) => item.name === "Energy Consumption"
    ).data;
    const lastSeries3 = lastReport.series.find(
      (item) => item.name === "Static Energy Generated"
    ).data;

    const newSeries1 =
      lastSeries1 +
      req.body.series.find((item) => item.name === "Energy Generated").data;
    const newSeries2 =
      lastSeries2 +
      req.body.series.find((item) => item.name === "Energy Consumption").data;
    const newSeries3 =
      lastSeries3 +
      req.body.series.find((item) => item.name === "Static Energy Generated")
        .data;

    const newReport = new Report({
      _id: req.body._id,
      dateTime: req.body.dateTime,
      series: [
        { name: "Energy Generated", data: newSeries1 },
        { name: "Energy Consumption", data: newSeries2 },
        { name: "Static Energy Generated", data: newSeries3 },
      ],
    });
    await newReport.save();
    res.json(newReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Failed to create report" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

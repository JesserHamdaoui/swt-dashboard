const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  windSpeed: {
    type: Number,
    required: true,
  },
  windDirection: {
    type: Number,
    required: true,
  },
  generatedEnergy: {
    type: Number,
    required: true,
  },
  staticEnergy: {
    type: Number,
    required: true,
  },
  consumedEnergy: {
    type: Number,
    required: true,
  },
  alerts: {
    type: [
      {
        status: {
          type: String,
          required: true,
        },
        dateTime: {
          type: String,
          required: true,
        },
        windTurbine: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;

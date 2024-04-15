const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  windTurbine: {
    _id: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
    bladesLength: {
      type: Number,
      required: true,
    },
    staticDirection: {
      type: Number,
      required: true,
    },
  },
  dateTime: {
    type: Date,
    required: true,
  },
  windDirection: {
    type: Number,
    required: true,
  },
  angleOfAttack: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

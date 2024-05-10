const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  series: [
    {
      name: {
        type: String,
        required: true,
      },
      data: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ip: String,
    userAgent: String,
    browser: String,
    os: String,
    device: String,
    referer: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Click", clickSchema);

const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  valor: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Data", DataSchema);

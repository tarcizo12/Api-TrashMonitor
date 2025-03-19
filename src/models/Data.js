const mongoose = require("mongoose");

//* A ideia é que esse arquivo seja o objeto que sera resgtado ou registrado no MongoDB*//
const DataSchema = new mongoose.Schema({
  valor: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Data", DataSchema);

const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  idLixeira: { type: Number, required: true }, 
  percentualVolumeAtual: { type: Number, required: true }, 
  datahoraRegistroMensagem: { type: Date, default: Date.now }, 
});


module.exports = mongoose.model("Data", DataSchema);

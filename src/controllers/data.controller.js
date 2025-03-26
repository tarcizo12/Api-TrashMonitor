const Data = require("../models/Data");

//* A ideia é que esse arquivo gerencie os inserts, updates e consultas na base*// 
exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};

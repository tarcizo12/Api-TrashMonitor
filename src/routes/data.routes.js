const express = require("express");
const { getAllData, getDataById } = require("../controllers/data.controller"); // Importa as funções do controller
const { client } = require("../config/mqtt"); 
const router = express.Router();

const PATHS = {
  TESTAR_API: "/teste",
  LIXEIRAS: "/lixeiras", 
  LIXEIRA_ID: "/lixeira/:idLixeira" 
};


// ✅ Rota para testar a API
router.get(PATHS.TESTAR_API, (req, res) => {
  res.json({ message: "API está funcionando corretamente!" });
});

// ✅ Rota para retornar dados de todas as lixeiras
router.get(PATHS.LIXEIRAS, async (req, res) => {
  getAllData(res); // Chama a função getAllData do controller
});

// ✅ Rota para retornar os dados de uma lixeira específica
router.get(PATHS.LIXEIRA_ID, getDataById);

module.exports = router;

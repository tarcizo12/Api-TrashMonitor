const express = require("express");
const { getAllData, getDataById } = require("../controllers/data.controller"); // Importa as funções do controller
const router = express.Router();

const PATHS = {
  VERIFICAR_MENSAGENS_BROKER: "/mqtt/messages",
  TESTAR_API: "/teste",
  LIXEIRAS: "/lixeiras", // Endpoint para retornar dados de todas as lixeiras
  LIXEIRA_ID: "/lixeira/:idLixeira" // Endpoint para retornar dados de uma lixeira específica
};

// ✅ Rota para verificar mensagens MQTT
router.get(PATHS.VERIFICAR_MENSAGENS_BROKER, (req, res) => {
  const messages = getLastMessages();
  res.json({ messages });
});

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

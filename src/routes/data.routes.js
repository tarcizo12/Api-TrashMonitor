const express = require("express");
const { getLastMessages } = require("../config/mqtt"); 

const router = express.Router();

const PATHS = {
    VERIFICAR_MENSAGENS_BROKER: "/mqtt/messages",
    TESTAR_API : "/teste"
}

router.get(PATHS.VERIFICAR_MENSAGENS_BROKER, (req, res) => {
  const messages = getLastMessages();
  res.json({ messages });
});

router.get(PATHS.TESTAR_API, (req, res) => {
  res.json({ message: "API está funcionando corretamente!" });
});

module.exports = router;

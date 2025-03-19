const express = require("express");
const { client, getLastMessages } = require("./config/mqtt");

const app = express();
const PORT = 4000;

// Usar JSON no body
app.use(express.json());

// Endpoint para retornar as últimas 5 mensagens do broker MQTT
app.get("/mqtt/messages", (req, res) => {
  // Obter as últimas mensagens
  const messages = getLastMessages();
  res.json({ messages });
});

// Endpoint de teste para verificar se a API está funcionando corretamente
app.get("/teste", (req, res) => {
  res.json({ message: "API está funcionando corretamente!" });
});

// Função para iniciar a conexão com o MQTT e o servidor Express
const startServer = () => {
  // Iniciar o servidor Express
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
};

// Chamar a função para iniciar o servidor e a conexão MQTT
startServer();

const mqtt = require("mqtt");

const brokerUrl = "mqtt://seu-broker.com";
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Conectado ao broker MQTT!");
  client.subscribe("topico/hardware");
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida: ${message.toString()}`);
  // Aqui você pode salvar no MongoDB ou processar de outra forma
});

module.exports = client;

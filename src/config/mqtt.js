const mqtt = require("mqtt");
const dotenv = require("dotenv");
const { createData } = require("../controllers/data.controller"); // Importando o método de criação
dotenv.config();

const MENSAGEM_CONECTADO = "Conectado ao broker MQTT";
const MENSAGEM_ERRO_CONEXAO = "Erro na conexão MQTT:";
const MENSAGEM_RECEBIDA_TOPICO = "Mensagem recebida no tópico:";
const MENSAGEM_INSCRICAO_TOPICO = "Inscrito no tópico:";
const MENSAGEM_ERRO_INSCRICAO_TOPICO = "Erro ao se inscrever no tópico:";
const TOPICO_INSCRICAO = "MonitoramentoLixo";

const options = {
  host: process.env.MQTT_BROKER_URL,
  port: process.env.MQTT_PORT,
  protocol: "mqtts",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(options);

client.on("connect", function () {
  console.log(MENSAGEM_CONECTADO);
  client.subscribe(TOPICO_INSCRICAO, function (err) {
    if (!err) {
      console.log(`${MENSAGEM_INSCRICAO_TOPICO} ${TOPICO_INSCRICAO}`);
    } else {
      console.log(MENSAGEM_ERRO_INSCRICAO_TOPICO, err);
    }
  });
});

client.on("error", function (error) {
  console.error(MENSAGEM_ERRO_CONEXAO, error);
});

client.on("message", async function (topic, message) {
  try {
    const mensagemRecebida = message.toString();
    console.log(`${MENSAGEM_RECEBIDA_TOPICO} ${topic}, valor: ${mensagemRecebida}`);


    await createData( JSON.parse(mensagemRecebida) );
  } catch (error) {
    console.error("❌ Erro ao processar a mensagem MQTT:", error.message);
  }
});

module.exports = { client };

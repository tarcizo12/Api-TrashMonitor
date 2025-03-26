const mqtt = require('mqtt');
const dotenv = require("dotenv");
dotenv.config();

const MENSAGEM_CONECTADO = 'Conectado ao broker MQTT';
const MENSAGEM_ERRO_CONEXAO = 'Erro na conexão MQTT:';
const MENSAGEM_RECEBIDA_TOPICO = 'Mensagem recebida no tópico:';
const MENSAGEM_INSCRICAO_TOPICO = 'Inscrito no tópico:';
const MENSAGEM_ERRO_INSCRICAO_TOPICO = 'Erro ao se inscrever no tópico:';
const LIMITE_DE_MENSAGENS_RETORNADAS = 10;
const TOPICO_INSCRICAO = "MonitoramentoLixo";

// Armazenar as últimas mensagens recebidas
const messages = [];

const options = {
    host: process.env.MQTT_BROKER_URL,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(options);

client.on('connect', function () {
    console.log(MENSAGEM_CONECTADO);
});

client.on('error', function (error) {
    console.log(MENSAGEM_ERRO_CONEXAO, error);
});

client.on('message', function (topic, message) {
    const mensagemRetornadaTopicoMonitoramento = message.toString();

    console.log(`${MENSAGEM_RECEBIDA_TOPICO} ${topic}, valor: ${mensagemRetornadaTopicoMonitoramento}`);

    if (messages.length >= LIMITE_DE_MENSAGENS_RETORNADAS) {
        messages.shift();
    }

    messages.push(mensagemRetornadaTopicoMonitoramento);
});

// Inscrever-se no tópico 'MonitoramentoLixo'
client.subscribe(TOPICO_INSCRICAO, function (err) {
    if (!err) {
        console.log(`${MENSAGEM_INSCRICAO_TOPICO} ${TOPICO_INSCRICAO}`);
    } else {
        console.log(MENSAGEM_ERRO_INSCRICAO_TOPICO, err);
    }
});

const getLastMessages = () => {
    return messages;
};

module.exports = { client, getLastMessages };

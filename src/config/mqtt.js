var mqtt = require('mqtt');
const dotenv = require("dotenv");
dotenv.config();

var messages = []; // Armazenar as últimas 5 mensagens recebidas

// Opções de conexão com base nas suas credenciais
var options = {
    host: process.env.MQTT_BROKER_URL, 
    port: process.env.MQTT_PORT,        
    protocol: 'mqtts',                  
    username: process.env.MQTT_USERNAME, 
    password: process.env.MQTT_PASSWORD  
};

console.log("opcoes, ", options)


const client = mqtt.connect(options);


client.on('connect', function () {
    console.log('Conectado ao broker MQTT');
});

client.on('error', function (error) {
    console.log('Erro na conexão MQTT:', error);
});


client.on('message', function (topic, message) {
    console.log('Mensagem recebida no tópico', topic, ':', message.toString());

    // Adicionar a mensagem ao array de mensagens (limitar a 5 mensagens)
    if (messages.length >= 5) {
        messages.shift(); // Remove a mensagem mais antiga
    }
    messages.push(message.toString());
});

// Inscrever-se no tópico 'MonitoramentoLixo'
client.subscribe('MonitoramentoLixo', function (err) {
    if (!err) {
        console.log('Inscrito no tópico: MonitoramentoLixo');
    } else {
        //console.log('Erro ao se inscrever no tópico:', err);
    }
});


const  getLastMessages = () => {
    return messages;
}

module.exports = { client, getLastMessages };

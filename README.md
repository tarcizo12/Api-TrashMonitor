# Api-TrashMonitor

Este projeto foi desenvolvido como parte da entrega final da cadeira **T138-16 - Projeto de Tecnologia Intercursos**. A API tem como objetivo consumir dados enviados por um microcontrolador sobre a volumetria de uma lixeira, persistindo essas informações em um banco de dados MongoDB em períodos determinados.

## 📁 Estrutura do Projeto

O projeto segue uma estrutura modular para facilitar a manutenção e escalabilidade:

```
Api-TrashMonitor/
│── src/
│   │── config/           # Configuração do projeto
│   │   │── mqtt.js       # Conexão com o broker MQTT
│   │   │── database.js   # Conexão com o MongoDB
│   │── routes/           # Definição das rotas da API
│   │   │── data.routes.js # Rota para obtenção de dados
│   │── controllers/      # Lógica das rotas
│   │   │── data.controller.js # Controlador de dados
│   │── models/           # Modelos do banco de dados (MongoDB)
│   │   │── Data.js       # Modelo de dados da lixeira
│   │── services/         # Serviços de comunicação com MQTT
│   │   │── mqttService.js # Processamento das mensagens MQTT
│   │── app.js            # Configuração do Express e middlewares
│── server.js             # Ponto de entrada do servidor
│── package.json          # Dependências e scripts
│── .env                  # Variáveis de ambiente
│── README.md             # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript para execução do backend
- **Express** - Framework para construção da API
- **MongoDB** - Banco de dados NoSQL para persistência dos dados
- **Mongoose** - ODM para modelagem e manipulação do MongoDB
- **MQTT.js** - Biblioteca para comunicação com o broker MQTT
- **dotenv** - Gerenciamento de variáveis de ambiente

## 🚀 Como Executar o Projeto

### 1️⃣ **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (pode usar um serviço como MongoDB Atlas)
- Um **broker MQTT** (exemplo: [Mosquitto](https://mosquitto.org/))

### 2️⃣ **Configuração**
Clone o repositório e instale as dependências:

```sh
git clone https://github.com/seu-usuario/Api-TrashMonitor.git
cd Api-TrashMonitor
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente:

```sh
MONGO_URI=mongodb://localhost:27017/trashmonitor
MQTT_BROKER_URL=mqtt://seu-broker.com
PORT=3000
```

### 3️⃣ **Executando a API**
Para iniciar o servidor:

```sh
npm start
```

A API estará rodando em:  
📌 **http://localhost:3000**

### 4️⃣ **Endpoints Disponíveis**
| Método | Rota         | Descrição |
|--------|-------------|-----------|
| GET    | `/api/dados` | Retorna os dados da lixeira armazenados no MongoDB |

## 📡 Comunicação MQTT
O serviço MQTT escuta mensagens no tópico **`topico/hardware`** e armazena as informações no banco de dados.
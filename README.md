# Api-TrashMonitor

Este projeto foi desenvolvido como parte da entrega final da cadeira **T138-16 - Projeto de Tecnologia Intercursos**. A API tem como objetivo consumir dados enviados por um microcontrolador sobre a volumetria de uma lixeira, persistindo essas informações em um banco de dados MongoDB em períodos determinados.

## 📁 Estrutura do Projeto

O projeto segue uma estrutura modular.

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
- **nodemon** - Monitoramento de alterações no código para reinicialização automática do servidor

## 🚀 Como Executar o Projeto

### 1️⃣ **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (pode usar um serviço como MongoDB Atlas)
- Um **broker MQTT** (exemplo: [HiveMQ](https://www.hivemq.com/mqtt/public-mqtt-broker/))

### 2️⃣ **Configuração**
Clone o repositório e instale as dependências:

```sh
git clone https://github.com/seu-usuario/Api-TrashMonitor.git
cd Api-TrashMonitor
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente:


### 3️⃣ **Executando a API**

#### 🔥 Modo de desenvolvimento (com reinicialização automática)
Se deseja rodar a API e reiniciar automaticamente ao detectar mudanças no código, utilize `nodemon`:

```sh
npm run dev
```

#### 🚀 Modo de produção
Para rodar a API sem monitoramento de mudanças, utilize:

```sh
npm start
```

A API estará rodando em:  
📌 **http://localhost:4000/api**

### 4️⃣ **Endpoints Disponíveis**
| Método | Rota             | Descrição |
|--------|-----------------|-----------|
| GET    | `api/lixeiras` | Retorna todas as colecoes e seus respectivos registros |
| GET    | `api/teste`         | Verifica se a API está funcionando corretamente |
| GET    | `/lixeira/:idLixeira`         | Pesquisa registro por ID da colecao |



## 📡 Comunicação MQTT
O serviço MQTT escuta mensagens no tópico **`MonitoramentoLixo`** e armazena as informações no banco de dados.

# Exemplo de mensagem postada no broker MQTT

As mensagens enviadas para o broker MQTT terão o seguinte formato para informar o status de uma lixeira:

```json
{
  "idLixeira": "1",
  "percentualVolumeAtual": 89,
  "datahoraRegistroMensagem": "2025-03-22 21:56:07"
}
```

## 📜 Scripts Disponíveis
No arquivo `package.json`, foram adicionados os seguintes scripts:

```json
"scripts": {
  "start": "node ./src/app.js",
  "dev": "nodemon ./src/app.js"
}
```

- **`npm run dev`** → Inicia a API com `nodemon` (recarrega automaticamente ao detectar mudanças no código)
- **`npm start`** → Inicia a API normalmente com Node.js

---

Agora o projeto está pronto para desenvolvimento e produção! 🚀


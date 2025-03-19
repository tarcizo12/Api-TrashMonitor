const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const dataRoutes = require("./routes/data.routes");

// Configurar variáveis de ambiente
dotenv.config();

// Conectar ao banco
connectDB();

const app = express();
app.use(express.json());

// Definir rotas
app.use("/api", dataRoutes);

module.exports = app;

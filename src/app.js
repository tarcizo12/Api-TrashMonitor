const express = require("express");
const dotenv = require("dotenv");
const dataRoutes = require("./routes/data.routes");
const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(express.json());

app.use("/api", dataRoutes); 

const startServer = () => {
  app.listen(PORT, () => {  console.log(`Servidor rodando em http://localhost:${PORT}`); });
};

startServer();

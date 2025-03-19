const express = require("express");
const dataRoutes = require("./routes/data.routes");

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api", dataRoutes); 

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer();

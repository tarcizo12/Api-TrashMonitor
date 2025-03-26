require("dotenv").config(); 
const { MongoClient, ServerApiVersion } = require('mongodb');

let client; 

const connectDB = async () => {
  try {
    if (client) {
      console.log("✅ Conexão existente com o MongoDB já está aberta.");
      return client;
    }


    client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    
    await client.db("admin").command({ ping: 1 });

    console.log("✅ MongoDB conectado com sucesso ao cluster TrashMonitor!");
    return client;

  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

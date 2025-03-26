const { ObjectId } = require("mongodb"); // Adicionando a importação do ObjectId
const connectDB = require("../config/database"); // Conexão com o banco

const DATABASE_NAME = "trash-monitor"; 
let dbClient;

const getDBClient = async () => {
  if (!dbClient) { dbClient = await connectDB(); }
  return dbClient;
};

// ✅ Buscar todos os registros de todas as lixeiras
exports.getAllData = async (res) => { 
  try {
    const client = await getDBClient();
    const collections = await client.db(DATABASE_NAME).listCollections().toArray(); 

    const allData = [];

    for (const collection of collections) {
      if (collection.name.startsWith("Lixeira")) { 
        const registros = await client.db(DATABASE_NAME).collection(collection.name).find().toArray(); 
        allData.push({ colecao: collection.name, registros });
      }
    }

    res.json(allData); 
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados de todas as lixeiras" });
  }
};


// ✅ Buscar registros por id da lixeira
exports.getDataById = async (req, res) => {
  try {
    const { idLixeira } = req.params;
    const client = await getDBClient(); 
    const data = await client.db(DATABASE_NAME).collection(`Lixeira${idLixeira}`).find().toArray(); 

    if (!data.length) {
      return res.status(404).json({ message: "Nenhum dado encontrado para essa lixeira." });
    }

    res.json(data); 
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados por idLixeira" });
  }
};

// ✅ Criar
exports.createData = async (req) => {
  try {
    const { idLixeira, percentualVolumeAtual } = req;

    const res = {
      status: (code) => ({
        json: (response) => console.log(`📌 [MongoDB] Status: ${code}, Response:`, response),
      }),
    };

    const client = await getDBClient(); 

    const newData = {
      idLixeira,
      percentualVolumeAtual,
      datahoraRegistroMensagem: new Date().toISOString().split('T').join(' ').split('.')[0], 
    };

    const result = await client.db(DATABASE_NAME).collection(`Lixeira${idLixeira}`).insertOne(newData);

    const insertedData = await client.db(DATABASE_NAME).collection(`Lixeira${idLixeira}`).findOne({ _id: result.insertedId });

    res.status(201).json(insertedData); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar registro" });
  }
};



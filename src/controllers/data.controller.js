const Data = require("../models/Data");
const connectDB = require("../config/database"); // Conexão com o banco

const DATABASE_NAME = "trash-monitor"; 
let dbClient;

const getDBClient = async () => {
  if (!dbClient) {
    dbClient = await connectDB(); 
  }
  return dbClient;
};

// ✅ Buscar todos os registros
exports.getAllData = async (res) => {
  try {
    const client = await getDBClient(); 
    const data = await client.db(DATABASE_NAME).collection("data").find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};

// ✅ Buscar registros por id
exports.getDataById = async (req, res) => {
  try {
    const { idLixeira } = req.params;
    const client = await getDBClient(); 
    const data = await client.db(DATABASE_NAME).collection("data").find({ idLixeira }).toArray();

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
    const { idLixeira, percentualVolumeAtual } = req.body;
    const res = {
      status: (code) => ({
        json: (response) => console.log(`📌 [MongoDB] Status: ${code}, Response:`, response),
      }),
    };

    const client = await getDBClient(); 

    const newData = {
      idLixeira,
      percentualVolumeAtual,
      datahoraRegistroMensagem: new Date().toISOString().split('T').join(' ').split('.')[0], // Formato: YYYY-MM-DD HH:mm:ss

    };

    const result = await client.db(DATABASE_NAME).collection(`Lixeira${idLixeira}`).insertOne(newData);

    const insertedData = await client.db(DATABASE_NAME).collection(`Lixeira${idLixeira}`).findOne({ _id: result.insertedId });

    res.status(201).json(insertedData); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar registro" });
  }
};

// ✅ Atualizar
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { percentualVolumeAtual } = req.body;

    const client = await getDBClient(); // Obtém o cliente MongoDB

    const updatedData = await client.db(DATABASE_NAME).collection("data").findOneAndUpdate(
      { _id: new ObjectId(id) }, // Localiza pelo id
      { $set: { percentualVolumeAtual, datahoraRegistroMensagem: Date.now() } },
      { returnOriginal: false } // Retorna o documento atualizado
    );

    if (!updatedData.value) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    res.json(updatedData.value);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
};

// ✅ Deletar 
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getDBClient(); // Obtém o cliente MongoDB

    const deletedData = await client.db(DATABASE_NAME).collection("data").deleteOne({ _id: new ObjectId(id) });

    if (deletedData.deletedCount === 0) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    res.json({ message: "Registro deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
};

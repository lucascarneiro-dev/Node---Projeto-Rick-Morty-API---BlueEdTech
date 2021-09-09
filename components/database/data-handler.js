const { client, dbclose, ObjectId } = require("./connections");
const db = client.db("db_rickmorty");
const personagem = db.collection("personagens");

//home route - testing
const home = async (req, res) => {
  res.json({ info: "Olá, Blue" });
};

//Function to list all personagens
async function  listPersonagens(req, res) {
  const listAll = await personagem.find({}).toArray();
  listAll
    ? res.status(200).json(listAll)
    : res.status(404).json({ error: "Nenhum personagem encontrado" });
};

//Function to search personagem by id
const searchPersonagemById = (id) => personagem.findOne({ _id: ObjectId(id) });

//[GET] - Read all personagens
const listPersonagemById = async (req, res) => {
  const id = req.params.id;
  const listById = await searchPersonagemById(id);
  if(!listById){
  res.status(404).json({ error: "Nenhum personagem encontrado" });
  return;
}
  res.json(listById);
};

//[PUT] - Edit personagem in database
const editPersonagem = async (req, res) => {
  const id = req.params.id;
  const object = req.body;

  if (!object) {
    res.status(500).json({ message: "Requisição inválida" });
  }

  const quantitPersonagens = await personagem.countDocuments({
    _id: ObjectId(id),
  });

  if (quantitPersonagens !== 1) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const editById = await personagem.UpdateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set: object,
    }
  );

  if (editById.acknowledged == "undefined") {
    res.status(500).json({ error: "Atualização falhou" });
    return;
  }

  res.json(await searchPersonagemById(id));
};

//[POST] - Add personagem to database
const createPersonagem = async (req, res) => {
  const personagemReq = req.body;

  if (!personagemReq || !personagemReq.nome || !personagemReq.imagemUrl) {
    res.status(400).json({
      error:
        "Personagem inválido, certifique-se que tenha os campos nome e imagemUrl",
    });
    return;
  }

  const result = await personagem.insertOne(personagemReq);
  if (result.acknowledged == false) {
    res.status(500).json({ error: "Falha ao adicionar personagem no banco" });
    return;
  }

  res.status(201).json(personagemReq);
};

//[DELETE] - delete personagem from database
const deletePersonagem = async (req, res) => {
  const id = req.params.id;

  const quantitPersonagens = await personagem.countDocuments({
    _id: ObjectId(id),
  });

  if (quantitPersonagens !== 1) {
    res.status(404).send({ error: "Personagem não encontrao" });
    return;
  }

  const result = await personagem.deleteOne({
    _id: ObjectId(id),
  });

  if (result.deletedCount !== 1) {
    res.status(500).send({ error: "Falha ao remover o personagem" });
    return;
  }

  res.status(200).json({ mensagem: "Personagem Deletado" });
};

module.exports = {
  home,
  listPersonagens,
  listPersonagemById,
  editPersonagem,
  createPersonagem,
  deletePersonagem
};

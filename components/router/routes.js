const router = require("express").Router();
const cors = require("cors");
const {
  listPersonagemByID,
  listPersonagens,
  home,
  deletePersonagem,
  createPersonagem,
  editPersonagem,
} = require("../database/data-handler");

router.use(cors());
router.options("*",cors())

router.get("/home", home);
router.get("/personagens/", listPersonagens);
router.get("/personagens/:id", listPersonagemByID);
router.delete("/personagens/:id", deletePersonagem);
router.post("/personagens", createPersonagem);
router.put("/personagens/:id", editPersonagem);

module.exports = router;

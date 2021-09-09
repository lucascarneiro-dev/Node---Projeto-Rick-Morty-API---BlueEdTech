const router = require("express").Router();
const {
  listPersonagemById,
  listPersonagens,
  home,
  deletePersonagem,
  createPersonagem,
  editPersonagem,
} = require("../database/data-handler");
const cors = require("cors");


router.use(cors());
router.options("*",cors())

router.get("/home", home);
router.get("/", listPersonagens);
router.get("/:id", listPersonagemById);
router.delete("/:id", deletePersonagem);
router.post("/", createPersonagem);
router.put("/:id", editPersonagem);

module.exports = router;

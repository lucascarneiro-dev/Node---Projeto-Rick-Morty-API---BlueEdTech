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
router.get("/all", listPersonagens);
router.get("/readbyid/:id", listPersonagemById);
router.delete("/delete/:id", deletePersonagem);
router.post("/create", createPersonagem);
router.put("/edit/:id", editPersonagem);

module.exports = router;

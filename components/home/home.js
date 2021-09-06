const express = require("express");
const router = express.Router();

//Middleware especificar que é esse router que queremos utilizar
router.use(function timelog(req, res, next) {
    next();
  console.log("Time: ", Date.now());
});

router.get("/", async (req, res) => {
  res.send({ info: "Olá,Blue" });
});

module.exports = router;
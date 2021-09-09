const express = require("express");
require("express-async-errors");
const serverRouter = require("./components/router/routes");
const {validEndPoint, errorHandle} = require("./components/middlewares/middlewares");

const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(serverRouter);

//Middlewares
app.all("*", validEndPoint);
app.use(errorHandle);

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
  });
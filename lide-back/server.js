const express = require("express");
const router = require("./router");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const db = require("./db");
const { request } = require("http");

/* -- Connection à la base de donnée MongoDB --- */
db.connect();
app.use(cors());
app.use(express.json());

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});*/
/* --- Ensemble des routes --- */
app.use("/api/v1", router);

/* --- Lancement du serveur back --- */
app.listen(port, () => {
  console.log("Server starting : http://localhost:" + port);
});

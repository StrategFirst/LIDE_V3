const express = require("express");
const router = require("./router");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const db = require("./db");

/* -- Connection à la base de donnée MongoDB --- */
db.connect();
app.use(cors());
app.use(express.json());

/* --- Ensemble des routes --- */
app.use("/api/v1", router);

/* --- Lancement du serveur back --- */
app.listen(port, () => {
  console.log("Server starting : http://localhost:" + port);
});

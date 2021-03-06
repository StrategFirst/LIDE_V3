/* --- Imports bibliothèques --- */
// Default nodejs
const https = require("https");
const fs = require("fs");

// npm libraries
const express = require("express");

// local files
const db = require("./db");
const router = require("./router");

/* --- --- */
const portHTTPS = process.env.SERVER_PORT;

const app = express();

/* -- Connection à la base de donnée MongoDB --- */
db.connect();

/* --- Ensemble des routes --- */
app.use("/api/v1", router);

/* --- Configuration HTTPS --- */
let credentials = {
	key: fs.readFileSync('/HTTPS_CREDENTIALS/privkey.pem'),
	cert: fs.readFileSync('/HTTPS_CREDENTIALS/cert.pem'),
}

/* --- Lancement du serveur back --- */
let httpsServer = https.createServer( credentials , app );

httpsServer.listen( portHTTPS , () => console.log(`HTTPS ready on port ${portHTTPS}`) );

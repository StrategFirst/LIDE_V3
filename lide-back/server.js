const express = require("express");
const router = require("./router");
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require("fs");

//const portHTTP = process.env.SERVER_PORT;
const portHTTPS = process.env.SERVER_PORT;
const app = express();
const db = require("./db");
const { request } = require("http");

/* -- Connection à la base de donnée MongoDB --- */
db.connect();
app.use(cors());
app.use(express.json());

/* --- Ensemble des routes --- */
app.use("/api/v1", router);

/* --- Configuration HTTPS --- */
let credentials = {
	key: fs.readFileSync('/app/HTTPS_CREDENTIALS/privkey.pem'),
	cert: fs.readFileSync('/app/HTTPS_CREDENTIALS/cert.pem'),
	ca: fs.readFileSync('/app/HTTPS_CREDENTIALS/chain.pem'),
}

/* --- Lancement du serveur back --- */
//let httpServer = http.createServer( app );
let httpsServer = https.createServer( credentials , app );

//httpServer.listen( portHTTP , () => console.log(`HTTP ready on port ${portHTTP}`) );
httpsServer.listen( portHTTPS , () => console.log(`HTTPS ready on port ${portHTTPS}`) );

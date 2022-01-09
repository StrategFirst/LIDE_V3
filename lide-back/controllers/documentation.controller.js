const { readFileSync } = require('fs');

const general = ( res, file, mimetype ) => res.status(200).header('Content-Type', mimetype).send( readFileSync(`./documentation/${file}`).toString('utf-8') );

exports.page = (req, res) => general( res, 'index.html' , 'text/html');
exports.style = (req, res) => general( res, 'style.css' , 'text/css');
exports.data = (req, res) => general( res, 'data.json' , 'application/json');
exports.icon = (req, res) => general( res, 'icon.png' , 'image/png');

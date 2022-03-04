/* --------------- Librairies ----------------- */

const express = require("express");
const router = express.Router();

/* --------------- Controllers ---------------- */

const LoadController = name => require(`./controllers/${name}.controller`);
const user 	= LoadController('user');
const project 	= LoadController('project');
const file 	= LoadController('file');
const execution = LoadController('execution');
const session 	= LoadController('session');
const exporter 	= LoadController('export');
const mail 	= LoadController('mail');
const doc 	= LoadController('documentation');

/* -------------- Middlewares ----------------- */

// Globaux
const cors = require('cors');
const json = require('express').json;

router.use( cors() );
router.use( json() );

// Spécifiques
const verifAuth = require('./middlewares/verifAuth.middleware');
const errorGest = require('./middlewares/error.middleware');

/* ----------------- Routes ------------------- */

// User
router.post("/user"					, user.login );
router.post("/user/disconnect", verifAuth		, user.disconnect );
router.get ("/user/all", verifAuth			, user.getAllUser );
router.get ("/user/projects/", verifAuth		, user.getProjects );
router.get ("/user/projects/:username", verifAuth	, user.getProjects );

// Projet
router.post  ("/project", verifAuth			, project.create);
router.get   ("/project/:projectid/:username", verifAuth, project.get);
router.delete("/project/:projectid", verifAuth		, project.delete);
router.put   ("/project/:projectid", verifAuth		, project.update);

// Fichier
router.post  ("/file", verifAuth			, file.create);
router.get   ("/file/:fileid/:username", verifAuth	, file.get);
router.delete("/file/:fileid", verifAuth		, file.delete);
router.put   ("/file/:fileid", verifAuth		, file.update);

// Exécution
router.get ("/execute/:fileid/:username", verifAuth	, execution.execute);
router.post("/killexec", verifAuth			, execution.killExec);

// Export
router.get("/export/:username", verifAuth		, exporter.getExport);

// Documentation
router.get("/doc"		, doc.page );
router.get("/doc/content"	, doc.data );
router.get("/doc/icon"		, doc.icon );
router.get("/doc/style"		, doc.style );


router.use( errorGest );

/* -- -- */
module.exports = router;

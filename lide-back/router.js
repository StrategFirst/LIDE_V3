const express = require("express");
const router = express.Router();

/* --------------- Controllers----------------- */

const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const execution = require("./controllers/execution.controller");
const session = require("./controllers/session.controller");
const exporter = require("./controllers/export.controller");
const mail = require("./controllers/mail.controller");

/* ---------------- Security ------------------ */

const SessionService = require("./services/security/session.service");

/* ---------------- Routes -------------------- */

router.get("/user/all", ensureAuthenticated, user.getAll);
router.post("/user", ensureAuthenticated, user.post); // Vérifie la validiter depuis le cas , s'il n'éxiste pas chez nous on le créer et dans tous les cas il se connecte
router.delete("/user", ensureAuthenticated, user.delete);
router.get("/user/projects/:username", ensureAuthenticated, user.getProjects);
router.post("/user/projectsFrom", ensureAuthenticated, user.getProjectsFrom);

// Routes de gestion des projets
router.post("/project", ensureAuthenticated, project.create);
router.get("/project/:projectid/:username", ensureAuthenticated, project.get);
router.delete("/project/:projectid", ensureAuthenticated, project.delete);
router.put("/project/:projectid", ensureAuthenticated, project.update);

// Routes de gestion des fichiers
router.post("/file", ensureAuthenticated, file.create);
router.get("/file/:fileid/:username", ensureAuthenticated, file.get);
router.delete("/file/:fileid", ensureAuthenticated, file.delete);
router.put("/file/:fileid", ensureAuthenticated, file.update);

// Route de compilation & exécution
router.get("/execute/:fileid/:username", ensureAuthenticated, execution.execute);
// Route d'arrêt de l'exécution
router.post("/killexec", ensureAuthenticated, execution.killExec);

//route d'export
router.get("/export/:username", ensureAuthenticated, exporter.getExport);

// Route de validation cas + génération du token de session
router.get("/session", session.session);

// Route de validation du token de session
router.get("/validateSession", session.validateSession);

//Route pour envoyer le mail
router.post("/mail", mail.post);

async function ensureAuthenticated(req, res, next) {
  const session = req.headers.session;
  //const username = await SessionService.validateSession(session);
  //if (!username) res.status(401).json("User is not authenticated");

  // Toutes les requêtes se basent sur username étant donnée que le cas est désactivé,
  // il n'y a plus de session qui est généré par conséquent il faut indiqué un utilisateur en dur
  //req.username = "user2";
  next();
}

module.exports = router;

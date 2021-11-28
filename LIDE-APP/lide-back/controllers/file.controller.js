const FileService = require('../services/db/file.service');

// TODO : pour tout les controlleurs, s'assurer que les parametres ne sont pas vide, cela brise les requetes

exports.get = (req, res) => {
  const username = req.username;
  const fileid = req.params.fileid;

  FileService.get(username, fileid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.create = (req, res) => {
  let username = req.username;
  let projectid = req.body.projectid;
  let filename = req.body.filename;
  let extension = req.body.extension;

  FileService.create(username, projectid, filename, extension)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
};

exports.delete = (req, res) => {
  const username = req.username;
  const fileid = req.params.fileid;

  FileService.delete(username, fileid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

// Fonction pour renommer un fichier
exports.update = async (req, res) => {
  const username = req.username;
  const fileid = req.params.fileid;

  let file = null;

  let rename = req.query.rename;
  let save = req.query.save;
  let extension = req.body.extension;

  if (rename == 'true') {
    const newfilename = req.body.newfilename;
    file = await FileService.rename(username, fileid, newfilename, extension).catch((err) => {
      res.status(400).json(err.message);
    });
  }

  if (save == 'true') {
    const content = req.body.content;
    file = await FileService.save(username, fileid, content).catch((err) => {
      res.status(400).json(err.message);
    });
  }

  res.status(200).json(file);
};

const UserService = require('../services/db/user.service');

exports.get = (req, res) => {
  console.log("Bip");
  const username = req.username;
  UserService.getOrCreate(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("err rrr :" + err);

        res.status(400).json({error: err.message});
      });
};

exports.delete = (req, res) => {
  const username = req.username;

  UserService.delete(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};
exports.getProjects = async (req, res) => {
  const username = req.username;

  UserService.getProjects(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
};

const UserService = require('../services/db/user.service');

exports.get = (req, res) => {
  const username = req.params.username;
  UserService.getOrCreate(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.getAll = (req, res) => {
  UserService.getAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.post = (req, res) => {
  const username = req.body.username;
  UserService.NewUser(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.delete = (req, res) => {
  const username = req.body.username;
  UserService.delete(username)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};
exports.getProjects = async (req, res) => {
  const username = req.params.username;
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

exports.getProjectsFrom = async (req, res) => {
  const username = req.body.usernameFrom;
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

const UserService = require('../services/db/user.service');
const CASService = require('../services/cas/cas.service.cjs');

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
  const password = req.body.password;
  // Vérification des paramètres fournis
  if( username == undefined || password == undefined ) {
    res.sendStatus(400);
  } else {
    // Vérification du CAS
    CASService.login( username , password )
      .then( response => {
        if( response.status == 200 ) {
          // Connexion locale
          UserService.getOrCreate(username)
            .then((result) => {
               res.status(200).json(result);
            })
            .catch((err) => {
               res.status(400).json({error: err.message});
            });
        } else {
          res.status( response.status ).json( response.data );
        }
      })
      .catch( (error) => {
        console.error( error );
        res.sendStatus( 500 );
      });
  }
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

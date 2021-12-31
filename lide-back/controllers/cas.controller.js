const CASService = require('../services/cas/cas.service');

exports.post = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	CASService.login(username, password)
		.then( (response) => res.status( response.status ).json( response.data ) )
		.catch( (error) => {
			console.error( error )
			res.sendStatus(500);
		})
};

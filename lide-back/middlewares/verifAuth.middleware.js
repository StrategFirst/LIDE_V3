const SecurityService = require('../services/security/session.service');

module.exports = (req, res, next) => {
	try {
		const [type, credentials] = req.headers['authorization'].split(' ');
		let result = SecurityService.validate( credentials );
		if( result !== null ) {
			req.user = result;
			next();
		} else {
			res.sendStatus( 403 );
		}
	} catch( err ) {
		next( err );
	}
};

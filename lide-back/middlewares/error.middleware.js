module.exports = (err, req, res, next) => {
	if( err ) {
		console.error( "An unmanage error occured :" );
		console.error( err );
		res.sendStatus( 500 );
	} else {
		res.sendStatus( 404 );
	}
}


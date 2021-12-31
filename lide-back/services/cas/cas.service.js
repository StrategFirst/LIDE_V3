exports.login = async function(user_username, user_password) {

	let URL_login = 'https://casv6.univ-angers.fr/cas/login';

	import fetch from 'node-fetch';

	const S = (a) => a?a[1]:null;

	class CASError extends Error {
		constructor(reason,detail) {
			super( `Something went wrong the university auth system : ${ reason } ` );
			this.reason = reason;
			this.detail = detail;
		}
	}

	// 1 Récupération du formulaire
	fetch( URL_login , { method: 'GET' } )							// Demande du formulaire
		.then( reponse => reponse.text() )							// Récupération du contenu HTML
		.then( html => html.match(/<form(.|\n)*<\/form>/)[0]  )		// filtrage sur le formulaire
		.then( form => form.match(/<input([^>]*)/g) )				// puis sur chaque input
		.then( inputs => inputs.map( input => ( {					// pour chacun on ne garde que les champs intérressants
				name: S(input.match(/name="([^"]+)"/)),
				type: S(input.match(/type="([^"]+)"/)),
				value: S(input.match(/value="([^"]+)"/))
			} ) ) )
		.then( inputs => inputs.filter( input =>					// on ne conserve que les éléments utiles
			['password','text','hidden']
				.indexOf(input.type) != -1
			) )
		.then( inputs => inputs.map( input => { 					// on va remplir le formulaire
			switch( input.type ) {	
				case 'hidden':											// les inputs cacher doivent être pré-remplie
					break;
				case 'text':											// il doit s'agir de l'identifiant
					input.value = user_username;
					break;
				case 'password':										// et du mot de passe
					input.value = user_password;
					break;
				} return input; } ) )
		.then( inputs => inputs										// on transforme le corp de la requête pour que le serveur le lise
				.map( ({name,value}) => 
					`${name}=${value===null?'':value}` )
				.join('&') )
	// 2 Soumissions du formulaire
	.then( data => fetch( URL_login ,
	{
		method: 'POST',
		headers: { "Content-Type": 'application/x-www-form-urlencoded' },
		body: data
	} ) )
	// 3 Vérification si correct
		.then( response => { switch( response.status ) {
			case 200:
				return response.text();
			case 401:
				throw new CASError('wrong-login', response);
			default:
				throw new CASError('unknwon', response);
		} } )
	// 4 Gestion systèmeL
		.then( html => html.match(/<tr([^<]|(<[^\/])|(<\/[^t])|(<\/t[^r]))*<\/tr>/g)  )		// filtrage sur les éléments de réponse
		.then( elements => elements.map( element => element.match(/<span>([^<]*)<\/span>/g) ) )
		.then( elements => elements.filter( element => element != null ) )
		.then( elements => elements.map( pairs => pairs.map( u => u.substring(6,u.length - 7)	)) )
		.then( elements => elements.reduce( (acc,element) => { acc[ element[0] ] = element[1]; return acc; } , {} ) )
		.then( data => {
			if( data.auaStatut && data.auaStatut == '[etu]' ) {
				return {
					status : 200 ,
					"data" : {
						displayName : data.displayName.replace(/[|]/g,''),
						studentNumber : data.supannEtuId.replace(/[|]/g,''),
						email : data.email.replace(/[|]/g,''),
						uid : data.uid.replace(/[|]/g,''),
						info : 'ok'
					}
				}
			} else {
				throw new CASError('not-yet-teacher');
			}
		})
	// 5 Gestion erreur
		.catch( error => {
			if( error instanceof CASError ) {
				if( error.reason == 'wrong-login' ) {
					return { status : 401 , data : { info : 'Incorrect password or login'}};
				} else if( error.reason == 'not-yet-teacher') {
					return { status : 501 , data : { info : 'Authentication available only for student currently'}};
				} else {
					return { status : 503 , data : { info : 'Problem from the university auth system.'}};
				}
			} else {
				throw error;
			}
		})
}
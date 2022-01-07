
const { execSync } = require('child_process');
const { writeFile } = require('fs');

const UserService = require('../services/db/user.service');
const FileService = require('../services/db/file.service');

exports.getExport = async (req, res) => {
	const username = req.params.username;
	let mode;
	switch( req.query.type.toLowerCase() ) {
		case 'tgz':
			mode = 'tgz';
			break;
		case 'zip':
		default:
			mode: 'zip';
			break;
	}

	try {
		let result = await UserService.getProjects(username);

		for (const projet of result) {
			const projectname = projet.projectname;
			execSync(`mkdir -p /lide-export/${username}/${projectname}`);

			for (const projetFile of projet.files) {
				// Propriété du fichier
				const file = await FileService.get(username, projetFile._id);
				const filePath = `/lide-export/${username}/${projectname}/${file.filename}${file.extension}`;
				const fileContent = file.content;

				// Ecriture
				await new Promise( ( resolve , reject ) => {
					writeFile( filePath , fileContent , (err) => {
						if( err ) reject( err );
						else resolve();
					} );
				} );
		  	}
	 	}

		switch( req.query.type.toLowerCase() ) {
			case 'tgz':
				execSync(`tar -zcvf /lide-export/${username}.tgz /lide-export/${username}/*`);
				res.send(`/lide-export/${username}.tgz`);
				execSync(`rm -rf /lide-export/${username}.tgz /lide-export/${username}/`);
			case 'zip':
			default:
				execSync(`zip -r /lide-export/${username}.zip /lide-export/${username}/`);
				res.sendFile(`/lide-export/${username}.zip`);
				execSync(`rm -rf /lide-export/${username}.zip /lide-export/${username}/`);
			break;
		}
	} catch (error) {
		console.error("Problème durant l'export", error);
		res.sendStatus(400);
	}

}

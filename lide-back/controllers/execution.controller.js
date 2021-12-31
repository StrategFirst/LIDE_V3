const FileService = require('../services/db/file.service');
const ProjectService = require('../services/db/project.service');
const { execSync } = require('child_process');
const fs = require('fs').promises;

// Fonction de compilation & exécution
exports.execute = async (req, res) => {
	const username = req.params.username;
	const fileid = req.params.fileid;

	// Récupération du fichier initiateur de l'exécution
	const file = await FileService.get(username, fileid).catch((error) => {
		console.error(error);
		res.sendSstatus(500);
	});
	const filename = file.filename;
	const reqExtension = file.extension;

	// Récupération de son projet
	const project = await ProjectService.get(username, file.projectid).catch((error) => {
		console.error(error);
		res.sendStatus(500);
	});
	const projectname = project.projectname;

	// params containter
	const containerName = 'lide-user-' + username;
	let containerId = '';

	try {
		const extension = reqExtension.replace('.', ''); //FIXME A ENLEVER et adapter

		// Suppression des anciens fichiers sur le FS du serveur
		execSync('rm -rf /lide-data/' + username + '/');

		// Création du dossier de l'utilisateur sur le FS du serveur
		const projectPath = '/lide-data/' + username + '/' + projectname + '/';
		execSync('mkdir -p ' + projectPath);

		// Construction des fichiers sur le FS du serveur
		try {
			await constructFs(project, username);
		} catch(err) {
			console.error( err );
			return res.sendStatus(500);
		}

		// Supression d'un potentiel précedent container
		try {
			execSync('docker container rm --force ' + containerName);
		} catch (error) {
			console.error(error);
		}

		// Sélection de l'image docker //TODO réupérer ça dynamiquement en base
		var img;
		var startCommand;
		var TIMEOUT_VALUE = process.env.TIMEOUT_VALUE;

		//	fonction qui vérifie si une image de type img existe
		const checkIfImageExist = (img) => execSync(`docker images | grep ${img} | wc -l`).toString() == '1\n'

		switch (extension) {
			case 'cpp':
				img = "cpp_lide";
				startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v	${projectPath}:/workdir --name ${containerName} ${img} ${projectPath}`;
				break;
			case 'h':
				img = "cpp_lide";
				startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${projectPath}`;
				break;
			case 'java':
				img = "java_lide";
				startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${filename}.${extension}`;
				break;
			case 'py':
				img = "py_lide";
				startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${filename}.${extension}`;
				break;
			default:
				res.status(400).json("Extension non gérée");
		}

		// Lancement du conteneur
		console.debug(startCommand);

		// On teste si l'image existée, si ce n'est pas le cas a créé toutes les images en exécutant le fichier ./build_images.sh
		if(!checkIfImageExist(img))
			execSync('chmod +x images/build_images.sh && cd images && ./build_images.sh');

		execSync(startCommand);

		// Récupération de l'id du conteneur
		containerId = execSync('docker inspect --format=\'{{.Id}}\' ' + containerName).toString();
		containerId = containerId.substr(0, containerId.length - 1);
		res.status(200).json({ containerid: containerId });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

function constructFs(project, username) {
	return Promise.all( project.files.map( fileid => FileService
		.get(username, fileid)
	 	.then( file => {
			const filePath = '/lide-data/' + username + '/' + project.projectname + '/' + file.filename + file.extension;
			return fs.writeFile(filePath, file.content);
		} )
	) );
}

exports.killExec = (req, res) => {
	const username = req.body.username;
	const containerName = 'lide-user-' + username

	try {
		console.debug(`docker kill "${containerName}"`)
		execSync('docker kill ' + containerName);
		const statusMessage = `Container "${containerName}" successfully stopped.`;
		console.debug(`container "${containerName}" killed`)
		res.status(200).json({ status: statusMessage });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

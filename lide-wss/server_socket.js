const WebSocket = require('ws');
const { execSync } = require('child_process');

const Logger = require('./logger.js');

const server_port = process.env.SERVER_PORT;
const docker_api_port = process.env.DOCKER_API_PORT;
const docker_api_host = process.env.DOCKER_API_HOST;
const max_length_allowed_output = process.env.MAX_LENGTH_OUTPUT_ALLOWED;

const wss = new WebSocket.Server({ port: server_port });

wss.on('connection', function ( clientSocket ) {

	const logger = new Logger();

	logger.log("connected");

	let dockerSocket;
	let containerId;
	let firstMessage = true;
	let totalOutputLength = 0;
	let maxOutputLengthReached = false;

	clientSocket.on('message',async function ( input ) {
		// The first message contains the container ID
		//  other message send afterwardd are user input for the program

		if( firstMessage ) {
			logger.log(`Data : Client → Server (init)`);

			containerId = input.toString('utf8');
			// Vérification que le containerId ne contient que l'id et pas d'instruction malveillante
			if( ! containerId.match(/^([0-9a-z]+)$/i) ) {
				logger.log('Interruption : identifiant invalide !');
				clientSocket.send(" -- Identifiant soumis invalide -- ");
				clientSocket.close();
				return;
			}
			// Vérification que l'id fourni correspond à un docker dont l'accès est permis
			if( ! execSync(`docker container ls --filter "id=${containerId}" --format "{{.Names}}"`).toString('utf8').replace(/\n/g,'').match(/lide-user-([a-z0-9A-Z\._\-]+)/) ) {
				logger.log('Interruption : identifiant suspet !');
				clienSocket.send(" -- Identifaint soumis invalide -- ");
				clientSocket.close();
				return;
			}
			dockerSocket = new WebSocket(`ws://${docker_api_host}:${docker_api_port}/containers/${containerId}/attach/ws?stream=1&stdout=1&stdin=1&logs=1`);

			dockerSocket.on( 'open' , function () {
				logger.log("Succesfully connected to the docker api");
				dockerSocket.send("\n");
				// We must send a char to finish the read command which happend before the program runs
				//  this is here to make the program wait someone to be connected before running
				//  otherwise the program might run and end before the user got the time to connect to it
			});

			dockerSocket.on( 'error' , function ( error ) {
				logger.error( 'Error comming from the docker API :', error );
			} );

			dockerSocket.on( 'message', function (output) {
				if (!maxOutputLengthReached) {
					totalOutputLength += output.length;
					if (totalOutputLength < max_length_allowed_output) {
						logger.log(`Data : Client ← Server (length: ${output.length})`)
						clientSocket.send(output);
					} else {
						logger.log("Too much output from this container");
						maxOutputLengthReached = true;

						cliebtSocket.send(" -- Détection de boucle infinie. -- ");
						dockerSocket.close();
						clientSocket.close();
						delete dockerSocket;
					}
				}
			});

			dockerSocket.on('close', function () {
				logger.log("Disconnected");
				clientSocket.close();
			});

			firstMessage = false;
		} else {
			dockerSocket.send(input);
			logger.log(`Data : Client → Server (user input,length: ${input.length})`);
		}

	});
});

wss.on( 'close' , function close() {
	console.log('> client disconnected');
});

console.log( Logger.now() , `WebSocketServer listening on port ${server_port} `);




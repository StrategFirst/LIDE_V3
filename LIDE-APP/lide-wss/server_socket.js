const WebSocket = require('ws');

const _port = process.env.LIDE_WSS_PORT;

const ws = new WebSocket.Server({ port: _port });

ws.on('connection', function connection(ws) {
  console.log("> connected");

  let dockerSocket;
  let containerId;
  let firstMessage = true;
  let totalOutputLength = 0;

  ws.on('message', function incoming(input) {
    console.log("> 1");
    if (firstMessage) {
      console.log("( " + input + ")");
      containerId = input;
      try{ 
        dockerSocket = new WebSocket('ws://localhost:2375/containers/' + containerId + '/attach/ws?stream=1&stdout=1&stdin=1&logs=1');
        console.log(dockerSocket);
      }
      catch(error){     
        console.log(error.toString("urf-8"));
      }
      dockerSocket.on('open', function open() {
        console.log("> successfully connected to docker api");
        //dockerSocket.send("\n");
      });

      var limitReached = false;
      dockerSocket.on('message', function incoming(output) {
        console.log("> 2");
        if (!limitReached) {
          totalOutputLength += output.length;
          if (totalOutputLength < 5000000) {
            ws.send(output);
            console.log("from docker : " + output);
          } else {
            console.log("> too much outputs detected");
            limitReached = true;

            ws.send(" -- Détection de boucle infinie. -- ");
            dockerSocket.close();
            ws.close();
            delete dockerSocket;
          }
        }
      });

      dockerSocket.on('close', function close() {
        console.log("> 3");
        console.log('> disconnected from docker');
        ws.close();
      });

      firstMessage = false;
    }
    else {
      dockerSocket.send(input);
      console.log("from web : " + input);
    }

  });
});

ws.on('close', function close() {
  console.log('> client disconnected');
});

console.log(" WS listening on port " + _port);

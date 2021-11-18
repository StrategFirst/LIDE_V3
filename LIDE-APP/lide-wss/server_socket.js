const WebSocket = require('ws');

const _port = process.env.LIDE_WSS_PORT;

const ws = new WebSocket.Server({ port: _port });

ws.on('connection', function connection(ws) {
  console.log("> connected");

  let dockerSocket;
  let containerId;
  let firstMessage = true;

  ws.on('message', function incoming(input) {
    console.log("> 1");
    if(firstMessage) {
      console.log(input.toString("utf8"));
      containerId = input.toString("utf8");
      dockerSocket = new WebSocket('ws://localhost:2375/containers/' + containerId + '/attach/ws?stream=1&stdout=1&stdin=1&logs=1');
      
      dockerSocket.on('open', function open() {
        console.log("> successfully connected to docker api");
        dockerSocket.send("\n");
      });

      dockerSocket.on('message', function incoming(output) {
        ws.send(output);
        console.log("from docker : " + output);
      });
     
      dockerSocket.on('close', function close() {
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

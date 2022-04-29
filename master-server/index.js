const WebSocket = require('ws');

console.log('Start master-server!');

const server = new WebSocket.WebSocketServer({ port: 12345 });

server.on('connection', (socket) => {
  console.log('New connection');

  socket.on('close', () => {
    console.log('disconnect');
  });
});

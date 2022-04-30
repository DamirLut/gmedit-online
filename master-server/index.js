///@ts-nocheck
import WebSocket, { WebSocketServer } from 'ws';
import { randomid } from '../tools/RandomExt.js';
import { Room } from './Room.js';

console.log('Start master-server!');

function heartbeat() {
  this.isAlive = true;
}

const server = new WebSocketServer({ port: 12345 });

function socket_send(socket, event, data) {
  socket.send(JSON.stringify({ event, data }));
}

server.on('connection', (socket, req) => {
  const client = {
    socket,
    id: 'user.' + randomid(),
    room: null,
  };
  socket.isAlive = true;
  socket.on('pong', heartbeat);
  console.log('conntected', client.id);
  const roomId = req.url.slice(1, req.url.length);
  if (roomId) {
    if (roomId in Room.Rooms) {
      Room.Rooms[roomId].join(client);
    }
  }
  socket.on('message', (message) => {
    const { event, data } = JSON.parse(message);
    switch (event) {
      case 'create-room': {
        const room = new Room(client);
        socket_send(socket, 'create-room', {
          room_id: room.id,
        });
        break;
      }
      case 'room-message': {
        if (client.room == null) return;
        if (client.room.id in Room.Rooms) {
          Room.Rooms[client.room.id].clients.forEach(({ socket }) => {
            socket.send(
              JSON.stringify({
                ...data,
                user: client.id,
              }),
            );
          });
        }
      }
    }
  });

  socket.on('close', () => {
    console.log('disconnected', client.id);
    if (client.room) client.room.leave(client);
  });
});

setInterval(() => {
  server.clients.forEach((socket) => {
    if (!socket.isAlive) return socket.terminate();
    socket.isAlive = false;
    socket.ping();
  });
}, 30000);

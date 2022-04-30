///@ts-nocheck
import WebSocket, { WebSocketServer } from 'ws';
import { randomid } from '../tools/RandomExt.js';
import { Room } from './Room.js';

console.log('Start master-server!');

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
  console.log('conntected', client.id);
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
      case 'join-room': {
        const id = data.id;
        if (id in Room.Rooms) {
          Room.Rooms[id].join(client);
        }
        break;
      }
    }
  });

  socket.on('close', () => {
    console.log('disconnected', client.id);
    client.room.leave(client);
  });
});

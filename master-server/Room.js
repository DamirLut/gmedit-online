import { randomid } from '../tools/RandomExt.js';
import { EventEmitter } from '../tools/EventEmitterWrapper.js';

export class Room extends EventEmitter {
  static Rooms = {};
  id = 'room.' + randomid();
  clients = [];

  constructor(admin) {
    super();

    Room.Rooms[this.id] = this;
    admin.room = this;
    console.log('room created', this.id);
    console.log('Rooms:', Object.keys(Room.Rooms).length);
    this.join(admin);
  }

  leave(client) {
    const find = this.clients.indexOf((_client) => _client.id == client.id);
    if (find) {
      this.clients.splice(find, 1);
      console.log('Room size:', this.clients.length);
    }
    if (this.clients.length == 0) {
      delete Room.Rooms[this.id];
      console.log('room destroyed', this.id);
      return;
    }
    this.sendRoom('chat', {
      message: `${client.id} lefted`,
    });
  }
  join(client) {
    this.clients.push(client);
    console.log(client.id, 'joined to', this.id);
    client.room = this;
    console.log('Room size:', this.clients.length);
    this.sendRoom('chat', {
      message: `${client.id} joined`,
    });
  }

  sendClient(client, event, data, _sender = { id: this.id }) {
    client.socket.send(
      JSON.stringify({
        event,
        data,
        user: _sender.id,
      }),
    );
  }

  sendRoom(event, data) {
    this.clients.forEach((client) => this.sendClient(client, event, data));
  }
}

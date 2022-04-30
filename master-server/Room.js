import { randomid } from '../tools/RandomExt.js';
import { EventEmitter } from '../tools/EventEmitterWrapper.js';

export class Room extends EventEmitter {
  static Rooms = {};
  id = 'room.' + randomid();
  clients = [];

  constructor(admin) {
    super();
    this.join(admin);
    Room.Rooms[this.id] = this;
    admin.room = this;
    console.log('room created', this.id);
  }

  leave(id) {
    const client = this.clients.indexOf((client) => client.id == id);
    if (client) {
      this.clients.splice(client, 1);
    }
    if (this.clients.length == 0) {
      delete Room.Rooms[this.id];
      console.log('room destroyed', this.id);
    }
  }
  join(client) {
    this.clients.push(client);
    console.log(client.id, 'joined to', this.id);
    client.room = this;
  }
}

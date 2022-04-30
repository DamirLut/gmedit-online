///@ts-nocheck
var ws = undefined;
import { EventEmitter } from './EventEmitterWrapper.js';

export default class WsWrapper extends EventEmitter {
  constructor(uri) {
    super();
    if (typeof WebSocket != 'undefined') {
      this.socket = new WebSocket(uri);
      this.socket.onopen = (event) => this.emit('open', {});
      this.socket.onclose = (event) => this.emit('close', {});
      this.socket.onmessage = (message) => this.emit('message', message.data);
      console.log('Using Browser WebSocket');
    } else {
      import('ws').then((data) => {
        this.socket = new data.WebSocket(uri);
        this.socket.on('open', (event) => this.emit('open', {}));
        this.socket.on('close', (event) => this.emit('close', {}));
        this.socket.on('message', (message) => this.emit('message', message));
        console.log('Using NodeJS WebSocket');
      });
    }
  }
  send(data) {
    this.socket.send(data);
  }
}

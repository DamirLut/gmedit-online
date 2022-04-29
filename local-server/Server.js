import WebSocket from 'ws';

export default class Server {
  socket = null;
  constructor(project) {
    const uri = 'ws://127.0.0.1:12345/';
    console.log('Using NodeJS WebSocket');
    this.socket = new WebSocket(uri);

    console.log('Load', project.name);
  }
}

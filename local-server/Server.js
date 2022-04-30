import WsWrapper from '../tools/wsWrapper.js';

export default class Server {
  socket = null;
  room_id = null;

  PromiseList = {};

  constructor(project, settings) {
    const uri = `ws://${settings['master-server-uri']}/`;

    this.socket = new WsWrapper(uri);
    this.socket.on('open', this.onReady.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
    console.log('Load', project.name);
  }
  onReady() {
    console.log('Connected to master-server');
    this.send('create-room').then((data) => {
      console.log('room created', data.room_id);
      this.room_id = data.room_id;
    });
  }

  onMessage(message) {
    const { event, data } = JSON.parse(message);
    if (event in this.PromiseList) {
      this.PromiseList[event].resolve(data);
      delete this.PromiseList[event];
    }
  }

  send(event, data) {
    this.socket.send(JSON.stringify({ event, data }));
    return new Promise((resolve, reject) => {
      this.PromiseList[event] = { resolve, reject };
    });
  }

  close() {
    this.socket.close();
  }
}

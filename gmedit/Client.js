import Chat from './Chat.js';
import VirtualProject from './VirtualProject.js';

export default class Client {
  constructor(uri) {
    this.socket = new WebSocket(uri);
    this.socket.onopen = this.onReady.bind(this);
    this.socket.onmessage = (event) => this.onMessage(event.data);
    this.socket.onclose = this.onClose.bind(this);
    this.project = new VirtualProject();
    this.chat = new Chat();
  }

  sendSocket(event, data) {
    this.socket.send(JSON.stringify({ event, data }));
  }
  sendRoom(event, data) {
    this.sendSocket('room-message', { event, data });
  }

  onReady() {
    console.log('ready');
    this.chat.openTab();
  }
  onMessage(data) {
    const json = JSON.parse(data);
    console.log(json);
    if (json.event === 'chat') {
      this.chat.push(`${json.user}: ${json.data.message}`);
    }
  }
  onClose() {}
}

export default class Client {
  constructor(uri) {
    this.socket = new WebSocket(uri);
    this.socket.onopen = this.onReady.bind(this);
    this.socket.onmessage = (event) => this.onMessage(event.data);
    this.socket.onclose = this.onClose.bind(this);
  }

  sendSocket(event, data) {
    this.socket.send(JSON.stringify({ event, data }));
  }
  sendRoom(event, data) {
    this.sendSocket('room-message', { event, data });
  }

  onReady() {
    console.log('ready');
    this.interval = setInterval(() => {
      this.sendRoom('file-open', {
        file: 'file.js',
      });
    }, 1000);
  }
  onMessage(data) {
    console.log(data);
  }
  onClose() {
    clearInterval(this.interval);
  }
}

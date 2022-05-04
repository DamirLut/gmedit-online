///@ts-nocheck

export default class Chat {
  list = [];
  root = null;

  constructor() {}

  openTab() {
    let File = new $gmedit['gml.file.GmlFile'](
      'Chat',
      null,
      $gmedit['file.kind.gml.KGmlSearchResults'].inst,
      '',
    );
    this.root = {
      element: document.createElement('div'),
      chatcontainer: document.createElement('div'),
      input: document.createElement('input'),
    };

    this.root.element.appendChild(this.root.chatcontainer);
    this.root.element.appendChild(this.root.input);
    this.root.element.className = 'chat-container';

    this.root.input.addEventListener('keyup', (event) => {
      if (event.keyCode == 13) {
        window.client.sendRoom('chat', {
          message: this.root.input.value,
        });
        this.root.input.value = '';
      }
    });

    File.editor.element = this.root.element;

    this.list.forEach((msg) => {
      this.push(msg);
    });

    $gmedit['gml.file.GmlFile'].openTab(File);
  }

  push(msg) {
    this.list.push(msg);
    this.root.chatcontainer.innerHTML += `<div>${msg}</div>`;
  }
}

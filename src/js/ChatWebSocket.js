export default class ChatWebSocket {
  constructor(url, onMessage, onOpen, onClose) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', onOpen);
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'history') {
        data.content.forEach((message) => {
          onMessage(message, true);
        });
      } else {
        onMessage(data);
      }
    });
    this.socket.addEventListener('close', onClose);
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }
}

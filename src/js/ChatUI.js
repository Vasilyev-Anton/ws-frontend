/* eslint-disable no-console */
export default class ChatUI {
  constructor(nickname) {
    this.nickname = nickname;
  }

  init() {
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message-input');
    this.messagesContainer = document.getElementById('messages-container');
    this.usersList = document.getElementById('users-list');

    if (this.messageForm && this.messageInput && this.messagesContainer && this.usersList) {
      this.messageForm.addEventListener('submit', this.handleSubmit.bind(this));
      this.messageInput.addEventListener('keydown', this.handleEnterPress.bind(this));
    } else {
      console.error('ChatUI cannot initialize because some elements are missing.');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendMessage();
  }

  handleEnterPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message !== '') {
      this.emit('send-message', { type: 'send', user: this.nickname, content: message });
      this.messageInput.value = '';
    }
  }

  updateUsersList(users) {
    this.usersList.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('li');
      userItem.textContent = user;
      if (user === this.nickname) {
        userItem.textContent = 'You';
        userItem.classList.add('current-user');
      }
      userItem.classList.add('user-item');
      this.usersList.appendChild(userItem);
    });
  }

  updateMessages(messages) {
    messages.forEach((message) => {
      const messageDiv = document.createElement('div');
      const userSpan = document.createElement('span');
      userSpan.textContent = message.user === this.nickname ? 'You' : message.user;
      userSpan.classList.add('message-user');
      const commaText = document.createElement('span');
      commaText.textContent = ', ';
      const timeSpan = document.createElement('span');
      timeSpan.textContent = message.time;
      timeSpan.classList.add('message-time');
      const lineBreak = document.createElement('br');

      const contentText = document.createTextNode(message.content);

      messageDiv.appendChild(userSpan);
      messageDiv.appendChild(commaText);
      messageDiv.appendChild(timeSpan);
      messageDiv.appendChild(lineBreak);
      messageDiv.appendChild(contentText);

      messageDiv.classList.add(message.user === this.nickname ? 'message-own' : 'message-other');

      this.messagesContainer.appendChild(messageDiv);
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 0);
  }

  disconnect() {
    this.emit('send-message', { type: 'exit', user: this.nickname });
  }

  on(event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  }

  emit(event, data) {
    const callbacks = this.callbacks && this.callbacks[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

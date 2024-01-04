/* eslint-disable class-methods-use-this */
export default class CreateDOMElements {
  constructor() {
    this.registrationForm = this.createRegistrationForm();
  }

  createRegistrationForm() {
    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Выберите псевдоним';
    form.appendChild(label);

    const nicknameInput = document.createElement('input');
    nicknameInput.type = 'text';
    nicknameInput.id = 'nickname';
    label.setAttribute('for', 'nickname');
    form.appendChild(nicknameInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Продолжить';
    form.appendChild(submitButton);

    return form;
  }

  createMessageForm() {
    const form = document.createElement('form');
    form.id = 'message-form';

    const messageInput = document.createElement('input');
    messageInput.id = 'message-input';
    messageInput.type = 'text';
    form.appendChild(messageInput);

    return form;
  }

  createMessagesContainer() {
    const div = document.createElement('div');
    div.id = 'messages-container';
    return div;
  }

  createUsersList() {
    const ul = document.createElement('ul');
    ul.id = 'users-list';
    return ul;
  }

  appendToDOM() {
    document.body.appendChild(this.registrationForm);
  }

  appendMessageFormAndUsersListToDOM() {
    this.usersList = this.createUsersList();
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    this.messagesContainer = this.createMessagesContainer();
    chatContainer.appendChild(this.messagesContainer);
    this.messageForm = this.createMessageForm();
    chatContainer.appendChild(this.messageForm);

    document.body.appendChild(this.usersList);
    document.body.appendChild(chatContainer);
  }

  removeRegistrationForm() {
    if (document.body.contains(this.registrationForm)) {
      document.body.removeChild(this.registrationForm);
    }
  }

  removeMessageForm() {
    if (document.body.contains(this.messageForm)) {
      document.body.removeChild(this.messageForm);
    }
  }
}

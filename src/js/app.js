/* eslint-disable no-console */
/* eslint-disable no-alert */
import CreateDOMElements from './CreateDOMElements';
import ChatUI from './ChatUI';
import ChatAPI from './ChatAPI';
import ChatWebSocket from './ChatWebSocket';

const chatAPI = new ChatAPI('http://localhost:3045');

const domElements = new CreateDOMElements();
domElements.appendToDOM();

let chatUI;

const showRegistrationWindow = () => {
  const { registrationForm } = domElements;
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const usernameInput = registrationForm.querySelector('input[type="text"]');
    const nickname = usernameInput.value.trim();

    if (!nickname) {
      alert('Пожалуйста, введите псевдоним.');
      return;
    }
    try {
      const response = await chatAPI.registerUser(nickname);

      if (response.status === 'Никнейм уже используется.') {
        alert('Такой никнейм уже занят, попробуйте другой.');
      } else if (response.status === 'OK') {
        domElements.removeRegistrationForm();
        chatUI = new ChatUI(nickname);
        domElements.appendMessageFormAndUsersListToDOM();
        chatUI.init();

        const chatSocket = new ChatWebSocket(
          'ws://localhost:3045/ws',
          (data) => {
            if (data.type === 'message') {
              console.log(data);
              chatUI.updateMessages([data]);
            }
            if (data.type === 'users') {
              chatUI.updateUsersList(data.users);
            }
          },
          () => {
            console.log('WebSocket соединение открыто');
            chatSocket.send({
              type: 'register',
              user: nickname,
            });
          },
          () => {
            console.log('WebSocket соединение закрыто');
          },
        );
        chatUI.on('send-message', (message) => {
          chatSocket.send({
            type: 'send',
            user: chatUI.nickname,
            content: message.content,
          });
        });
        window.addEventListener('beforeunload', () => chatUI.disconnect());
        chatUI.emit('load');
      } else {
        alert(`Ошибка регистрации: ${response.message}`);
      }
    } catch (error) {
      alert(`Ошибка регистрации: ${error.message}`);
    }
  });
};
document.addEventListener('DOMContentLoaded', showRegistrationWindow);

export default class ChatAPI {
  constructor(url) {
    this.url = url;
  }

  async registerUser(nickname) {
    const response = await fetch(`${this.url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status);
    }

    return response.json();
  }

  async sendMessage(message) {
    const response = await fetch(`${this.url}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  }
}

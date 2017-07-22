import React, { Component } from 'react';
import autobind from 'react-autobind';
import { sendMessage, receiveMessages, deleteMessages } from './sqsService';

class AppRoot extends Component {
  constructor () {
    super();
    autobind(this, 'handleSendClick', 'handleReceiveClick');
  }

  async handleSendClick() {
    await sendMessage({ month: 11, day: 10 });
  }

  async handleReceiveClick() {
    const messages = await receiveMessages();
    await deleteMessages(messages);
  }

  render() {
    return (
      <section>
        <div>Click the button</div>
        <div>
          <button
            onClick={this.handleSendClick}
          >Send</button>
          <button
            onClick={this.handleReceiveClick}
          >Receive</button>
        </div>
      </section>
    );
  }
}

export default AppRoot;

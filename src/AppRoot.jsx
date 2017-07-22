import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Provider } from 'react-redux';
import BirthdayPickerForm from './BirthdayPickerForm';
import BirthdayList from './BirthdayList';
import { sendMessage } from './sqsService';

class AppRoot extends Component {
  constructor () {
    super();
    autobind(this, 'handleBirthdayPickerFormSubmit');
  }

  handleBirthdayPickerFormSubmit({ day, month }) {
    sendMessage({ day, month });
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <BirthdayPickerForm
            onSubmit={this.handleBirthdayPickerFormSubmit}
          />
          <BirthdayList />
        </div>
      </Provider>
    );
  }
}

export default AppRoot;

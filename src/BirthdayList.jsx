import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { pollInit } from './actionCreators';

class BirthdayList extends Component {
  constructor() {
    super();
    autobind(this, 'handleStartPollingClick');
  }

  handleStartPollingClick() {
    this.props.pollInit();
  }

  renderStartPollingButton() {
    return (
      <button onClick={this.handleStartPollingClick}>
        Start polling
      </button>
    );
  }

  renderNoBirthdayMessage() {
    return <div>No birthdays yet</div>;
  }

  renderBirthdays() {
    return (
      <div>
        {this.props.birthdays.map(b => (
          <div key={b.id}>{b.day}/{b.month}</div>
        ))}
      </div>
    );
  }

  render() {
    if (!this.props.polling) {
      return this.renderStartPollingButton();
    }
    if (this.props.birthdays.length > 0) {
      return this.renderBirthdays();
    }

    return this.renderNoBirthdayMessage();
  }
}

BirthdayList.propTypes = {
  birthdays: PropTypes.array,
  polling: PropTypes.bool,
  pollInit: PropTypes.func,
};

BirthdayList.defaultProps = {
  birthdays: [],
  polling: false,
  pollInit: () => {},
};

export { BirthdayList as Pure };

export default connect(state => ({
  birthdays: state.app.birthdays,
  polling: state.app.polling,
}), {
  pollInit,
})(BirthdayList);

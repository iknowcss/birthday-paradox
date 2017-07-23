import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

class BirthdayList extends Component {
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
    if (this.props.birthdays.length > 0) {
      return this.renderBirthdays();
    }

    return this.renderNoBirthdayMessage();
  }
}

BirthdayList.propTypes = {
  birthdays: PropTypes.array,
};

BirthdayList.defaultProps = {
  birthdays: [],
};

export default BirthdayList;

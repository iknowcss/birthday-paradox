import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import BirthdayPickerForm from './BirthdayPickerForm';
import { submitBirthday } from './audienceActionCreators';

class AudiencePage extends Component {
  constructor() {
    super();
    autobind(this, 'handleBirthdayPickerFormSubmit')
  }

  handleBirthdayPickerFormSubmit(data) {
    this.props.submitBirthday(data);
  }

  render() {
    return (
      <div>
        <BirthdayPickerForm onSubmit={this.handleBirthdayPickerFormSubmit} />
      </div>
    )
  }
}

AudiencePage.propTypes = {
  submitBirthday: PropTypes.func.isRequired,
};

export { AudiencePage as Pure };

export default connect(state => ({}), {submitBirthday})(AudiencePage);

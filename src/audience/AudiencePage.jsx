import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import classnames from 'classnames';
import theme from '../theme/theme.scss';
import styles from './AudiencePage.scss';
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
    const { submitStatus } = this.props;
    return (
      <div>
        <h1
          className={classnames(theme.h1, styles.title)}
        >The Birthday Paradox</h1>
        <h2
          className={classnames(theme.h2, styles.instructions)}
        >Enter your birthday</h2>
        <BirthdayPickerForm
          disabled={submitStatus !== 'ready'}
          onSubmit={this.handleBirthdayPickerFormSubmit}
        />
      </div>
    )
  }
}

AudiencePage.propTypes = {
  submitBirthday: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export { AudiencePage as Pure };

export default connect(state => ({
  submitStatus: state.app.audience.submitStatus,
}), {submitBirthday})(AudiencePage);

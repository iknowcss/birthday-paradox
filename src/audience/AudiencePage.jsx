import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import classnames from 'classnames';
import theme from '../theme/theme.scss';
import Grid from '../unfinished/Grid';
import Cell from '../unfinished/Cell';
import styles from './AudiencePage.scss';
import BirthdayPickerForm from './BirthdayPickerForm';
import { submitBirthday, resetBirthdayForm } from './audienceActionCreators';

class AudiencePage extends Component {
  constructor() {
    super();
    autobind(
      this,
      'handleBirthdayPickerFormSubmit',
      'handleSubmitAnotherClick',
    );
  }

  handleBirthdayPickerFormSubmit(data) {
    this.props.submitBirthday(data);
  }

  handleSubmitAnotherClick() {
    this.props.resetBirthdayForm();
  }

  renderForm() {
    return (
      <BirthdayPickerForm
        className={styles.form}
        disabled={this.props.submitStatus !== 'ready'}
        onSubmit={this.handleBirthdayPickerFormSubmit}
      />
    )
  }

  renderSuccessTick() {
    return (
      <div className={styles.successMessage} >
        <i/>
        <div>Thanks!</div>
      </div>
    )
  }

  renderSuccess() {
    return (
      <Grid>
        <Cell
          className={styles.successCell}
          phonePush={2}
          phoneCol={8}
        >
        </Cell>
      </Grid>
    )
  }

  render() {
    return (
      <div className={styles.flexContainer}>
        <h1
          className={classnames(theme.h1, styles.title)}
        >The Birthday Paradox</h1>
        <h2
          className={classnames(theme.h2, styles.instructions)}
        >{this.props.submitStatus === 'success'
          ? this.renderSuccessTick()
          : 'Enter your birthday'
        }</h2>
        {this.props.submitStatus === 'success'
          ? this.renderSuccess()
          : this.renderForm()
        }
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
}), { submitBirthday, resetBirthdayForm })(AudiencePage);

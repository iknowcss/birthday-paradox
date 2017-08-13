import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import range from 'lodash/range';
import classnames from 'classnames';
import Grid from '../unfinished/Grid';
import Cell from '../unfinished/Cell';
import styles from './BirthdayPickerForm.scss';
import theme from '../theme/theme.scss';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const RangeSelectField = (props) => {
  const { input, start, end, options, className, disabled} = props;
  return (
    <select
      disabled={disabled}
      {...input}
      className={classnames(theme.select, className)}
    >
      {options
        ? options.map(({ value, text }) =>
        <option key={value} value={value}>{text}</option>)
        : range(start, end + 1).map(n =>
        <option key={n}>{n}</option>)
      }
    </select>
  );
};

class BirthdayPickerForm extends Component {
  render() {
    const { handleSubmit, disabled } = this.props;
    return (
      <form className={this.props.className} onSubmit={handleSubmit}>
        <Grid>
          <Cell
            className={styles.inputCell}
            phonePush={2}
            phoneCol={8}
            tabPortCol={4}
            tabPortPush={2}
            tabLandCol={3}
            tabLandPush={3}
          >
            <label className={styles.inputLabel}>Day</label>
            <Field
              name="day"
              component={RangeSelectField}
              className={styles.inputField}
              disabled={disabled}
              start={1}
              end={31}
            />
          </Cell>
          <Cell
            className={styles.inputCell}
            phonePush={2}
            phoneCol={8}
            tabPortCol={4}
            tabPortPush={0}
            tabLandCol={3}
          >
            <label className={styles.inputLabel}>Month</label>
            <Field
              name="month"
              component={RangeSelectField}
              className={styles.inputField}
              disabled={disabled}
              options={MONTHS.map((m, i) => ({ value: i + 1, text: m }))}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell
            className={styles.submitCell}
            phonePush={2}
            phoneCol={8}
          >
            <button
              className={classnames(theme.button, styles.submitButton)}
              disabled={disabled}
            >
              Submit
            </button>
          </Cell>
        </Grid>
      </form>
    );
  }
}

BirthdayPickerForm.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

BirthdayPickerForm.defaultValues = {
  disabled: false,
  className: '',
};

export { BirthdayPickerForm as Pure };

export default reduxForm({
  form: 'birthday-picker',
  initialValues: {
    day: 1,
    month: 1,
  }
})(BirthdayPickerForm);

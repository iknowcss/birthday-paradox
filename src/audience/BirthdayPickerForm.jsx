import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import range from 'lodash/range';

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

const RangeSelectField = ({ input, start, end, options, disabled }) => (
  <select disabled={disabled} {...input}>
    {options
      ? options.map(({ value, text }) =>
        <option key={value} value={value}>{text}</option>)
      : range(start, end + 1).map(n =>
        <option key={n}>{n}</option>)
    }
  </select>
);

class BirthdayPickerForm extends Component {
  render() {
    const { handleSubmit, disabled } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Day</label>
          <Field
            name="day"
            component={RangeSelectField}
            disabled={disabled}
            start={1}
            end={31}
          />
        </div>
        <div>
          <label>Month</label>
          <Field
            name="month"
            component={RangeSelectField}
            disabled={disabled}
            options={MONTHS.map((m, i) => ({ value: i + 1, text: m }))}
          />
        </div>
        <button disabled={disabled}>Submit</button>
      </form>
    );
  }
}

BirthdayPickerForm.propTypes = {
  disabled: PropTypes.bool,
};

BirthdayPickerForm.defaultValues = {
  disabled: false,
};

export { BirthdayPickerForm as Pure };

export default reduxForm({
  form: 'birthday-picker',
  initialValues: {
    day: 1,
    month: 1,
  }
})(BirthdayPickerForm);

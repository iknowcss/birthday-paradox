import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import range from 'lodash/range';

const RangeSelectField = ({ input, start, end }) => (
  <select {...input}>
    {range(start, end + 1).map(n => <option key={n}>{n}</option>)}
  </select>
);

class AppRoot extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Day</label>
          <Field
            name="day"
            component={RangeSelectField}
            start={1}
            end={31}
          />
        </div>
        <div>
          <label>Month</label>
          <Field
            name="month"
            component={RangeSelectField}
            start={1}
            end={12}
          />
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export { AppRoot as Pure };

export default reduxForm({
  form: 'birthday-picker',
  initialValues: {
    day: 1,
    month: 1,
  }
})(AppRoot);

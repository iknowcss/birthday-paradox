import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CandleGraph from './CandleGraph';
import styles from './BirthdayList.scss';

class BirthdayList extends Component {
  constructor() {
    super();

    this.state = { active: false };
    setTimeout(() => {
      this.setState({ active: true })
    }, 1000);
  }

  renderNoBirthdayMessage() {
    return <div>No birthdays yet</div>;
  }

  renderBirthdayGraph() {
    return (
      <div className={styles.container}>
        <CandleGraph active={this.state.active} />
      </div>
    );
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
      // return this.renderBirthdays();
      return this.renderBirthdayGraph();
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

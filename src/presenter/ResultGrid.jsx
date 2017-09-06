import React, { Component } from 'react';
import styles from './ResultGrid.scss';
import countBy from 'lodash/countBy';
import forEach from 'lodash/forEach';
import memoize from 'lodash/memoize';

const calculateCollisions = memoize(function (birthdays) {
  const result = [];
  forEach(countBy(birthdays, ({ month, day }) => `${month}/${day}`), (value, key) => {
    if (value > 1) {
      const [month, day] = key.split('/');
      result.push({ month, day });
    }
  });
  return result;
});

const MONTH = [
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

function th(day) {
  if (day < 10 || day > 20) {
    if (day % 10 === 1) return 'st';
    if (day % 10 === 2) return 'nd';
    if (day % 10 === 3) return 'rd';
  }

  return 'th';
}

class ResultGrid extends Component {
  render() {
    const collisions = calculateCollisions(this.props.birthdays);
    return (
      <div className={styles.container}>
        {collisions.length
          ? collisions.map(date => (
              <div className={styles.matchDate}>
                {date.day}{th(date.day)} {MONTH[date.month - 1]}
              </div>
            ))
          : <div className={styles.noMatches}>No matches!</div>
        }
      </div>
    );
  }
}

ResultGrid.defaultProps = {
  birthdays: [],
  hidden: false,
};

export default ResultGrid;

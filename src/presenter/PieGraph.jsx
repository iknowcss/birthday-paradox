import React, { Component } from 'react';
import classnames from 'classnames';
import { uniqBirthdayProb } from '../util/birthdayCalculator';
import styles from './PieGraph.scss';

function fff(r, _from, _to) {
  const from = Math.max(0, _from);
  const to = Math.min(0.999999, _to);

  const t1 = from * 2 * Math.PI;
  const x1 = r * (1 + Math.sin(t1));
  const y1 = r * (1 - Math.cos(t1));

  const t2 = to * 2 * Math.PI;
  const x2 = r * (1 + Math.sin(t2));
  const y2 = r * (1 - Math.cos(t2));

  const big = to - from > 0.5;
  const flag = big ? '1 0' : '0 1';
  const cood1 = big ? `${x2} ${y2}` : `${x1} ${y1}`;
  const cood2 = big ? `${x1} ${y1}` : `${x2} ${y2}`;

  return `
    M ${cood1}
    A ${r} ${r} 0 ${flag} ${cood2}
    L ${r} ${r} Z
  `;
}

class PieGraph extends Component {
  render() {
    const prob = uniqBirthdayProb(this.props.peopleCount);
    return (
      <div className={classnames(styles.container, {
        [styles.hidden]: this.props.hidden
      })}>
        <svg viewBox="0 0 100 100" className={styles.pie} xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles.pieA}
            d={fff(50, 0, prob)}
          />
          <path
            className={styles.pieB}
            d={fff(50, prob, 1)}
          />
        </svg>
        <div className={classnames(styles.pieLabel, {
          [styles.pieLabelVisible]: this.props.showLabel
        })}>
          {(Math.round(prob * 1000) / 10).toFixed(1)}%
        </div>
      </div>
    );
  }
}

PieGraph.defaultProps = {
  peopleCount: 0,
  hidden: false,
  showLabel: false,
};

export default PieGraph;

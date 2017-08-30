import React, { Component } from 'react';
import classnames from 'classnames';
import { uniqBirthdayProb } from '../util/birthdayCalculator';
import styles from './CandleGraph.scss';

const Bar = ({ value, delay, active = false, text, highlight }) => (
  <div
    style={{
      height: active ? `${value}%` : '0%',
      transitionDelay: `${delay}ms`
    }}
    className={classnames(styles.bar, {
      [styles.barHighlight]: highlight,
    })}
  >{text !== undefined ? <label className={styles.barLabel}>{text}</label> : null}</div>
);

Bar.defaultProps = {
  height: 0,
  delayMs: 0,
};

class CandleGraph extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.chartYAxis}>
          <span className={styles.chartYAxisLabel}>Probability</span>
        </div>
        <div className={styles.chartArea}>
          {Array.from({ length: 70 }, (q, i) => {
            const highlight = i < this.props.peopleCount;
            return (
              <Bar
                text={i + 1}
                value={(1 - uniqBirthdayProb(i + 1)) * 100}
                active={this.props.active}
                delay={highlight ? 0 : i * 5}
                highlight={highlight}
              />
            );
          })}
        </div>
        <div className={styles.chartXAxis}>
          <span className={styles.chartXAxisLabel}>People</span>
        </div>
      </div>
    );
  }
};

CandleGraph.defaultProps = {
  start: 1,
  end: 70,
  active: false,
  peopleCount: 0,
};

export default CandleGraph;

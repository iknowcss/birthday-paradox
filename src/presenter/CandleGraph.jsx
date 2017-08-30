import React, { Component } from 'react';
import { uniqBirthdayProb } from '../util/birthdayCalculator';
import styles from './CandleGraph.scss';

const Bar = ({ value, delay, active = false, text }) => (
  <div
    style={{
      height: active ? `${value}%` : '0%',
      'transition-delay': `${delay}ms`
    }}
    className={styles.bar}
  >{text !== undefined ? <label className={styles.barLabel}>{text}</label> : null}</div>
);

Bar.defaultProps = {
  height: 0,
  delayMs: 0,
};

const CandleGraph = ({ active }) => {
  return (
    <div className={styles.container}>
      <div className={styles.chartYAxis}>
        <span className={styles.chartYAxisLabel}>Probability</span>
      </div>
      <div className={styles.chartArea}>
        {Array.from({ length: 70 }, (q, i) => (
          <Bar
            text={i + 1}
            value={(1 - uniqBirthdayProb(i + 1)) * 100}
            active={active}
            delay={active ? i * 5 : 0}
          />
        ))}
      </div>
      <div className={styles.chartXAxis}>
        <span className={styles.chartXAxisLabel}>People</span>
      </div>
    </div>
  );
};

CandleGraph.defaultProps = {
  start: 1,
  end: 70,
  active: false,
};

export default CandleGraph;

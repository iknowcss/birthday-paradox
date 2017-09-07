import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { pagePrev, pageNext } from './presenterActionCreators';
import CandleGraph from './CandleGraph';
import PieGraph from './PieGraph';
import ResultGrid from './ResultGrid';
import Drumroll from './Drumroll';
import styles from './PresenterFlow.scss';

const PAGES = [
  () => <div className={styles.startBar}>Graphs!</div>,
  () => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={1} hidden />
      <PieGraph className={styles.pieGraph} peopleCount={1} hidden />
    </div>
  ),
  () => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={1} />
      <PieGraph className={styles.pieGraph} peopleCount={1} hidden />
    </div>
  ),
  () => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={1} active />
      <PieGraph className={styles.pieGraph} peopleCount={1} />
    </div>
  ),
  props => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={props.birthdays.length} active />
      <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} />
    </div>
  ),
  props => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={props.birthdays.length} active />
      <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} showLabel />
    </div>
  ),
  props => (
    <div className={styles.container}>
      <CandleGraph className={styles.candleGraph} peopleCount={props.birthdays.length} hidden />
      <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} hidden />
    </div>
  ),
  props => (
    <div className={styles.container}>
      <Drumroll />
    </div>
  ),
  props => (
    <div className={styles.container}>
      <ResultGrid className={styles.resultGrid} birthdays={props.birthdays} hidden/>
    </div>
  ),
  props => (
    <div className={styles.container}>
      <ResultGrid className={styles.resultGrid} birthdays={props.birthdays} />
    </div>
  ),
];

class PresenterFlow extends Component {
  constructor() {
    super();
    autobind(this, 'handleKey');
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    switch (e.key) {
      case 'PageDown':
      case 'ArrowRight':
        this.props.pageNext();
        e.preventDefault();
        break;
      case 'PageUp':
      case 'ArrowLeft':
        this.props.pagePrev();
        e.preventDefault();
        break;
    }
  }

  render() {
    return PAGES[Math.min(this.props.page - 1, PAGES.length - 1)](this.props);
  }
}

export default connect(state => ({
  page: state.app.presenter.page
}), { pagePrev, pageNext })(PresenterFlow);

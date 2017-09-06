import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { pagePrev, pageNext } from './presenterActionCreators';
import CandleGraph from './CandleGraph';
import PieGraph from './PieGraph';
import ResultGrid from './ResultGrid';
import styles from './PresenterFlow.scss';

const PAGES = [
  () => <CandleGraph className={styles.candleGraph} />,
  () => <CandleGraph className={styles.candleGraph} active />,
  props => <CandleGraph className={styles.candleGraph} active peopleCount={props.birthdays.length} />,
  props => <CandleGraph className={styles.candleGraph} active peopleCount={props.birthdays.length} hidden />,
  props => <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} hidden />,
  props => <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} />,
  props => <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} showLabel/>,
  props => <PieGraph className={styles.pieGraph} peopleCount={props.birthdays.length} hidden/>,
  props => <ResultGrid className={styles.resultGrid} birthdays={props.birthdays} hidden/>,
  props => <ResultGrid className={styles.resultGrid} birthdays={props.birthdays} />,
];

class PresenterFlow extends Component {
  constructor() {
    super();
    autobind(this, 'pageNext', 'pagePrev', 'handleKey');
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
    return (
      <div className={styles.container}>
        {PAGES[Math.min(this.props.page - 1, PAGES.length - 1)](this.props)}
      </div>
    );
  }
}

export default connect(state => ({
  page: state.app.presenter.page
}), { pagePrev, pageNext })(PresenterFlow);

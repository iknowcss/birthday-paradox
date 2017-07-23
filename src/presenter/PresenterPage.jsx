import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import get from 'lodash/get';
import queryString from 'query-string';
import BirthdayList from './BirthdayList';
import { initSQS } from './presenterActionCreators';

class PresenterPage extends Component {
  constructor() {
    super();
    autobind(this, 'handleSqsStartClick');
  }

  componentDidMount() {
    const { accessKeyId, secretAccessKey } = this.props;
    this.props.initSQS({ accessKeyId, secretAccessKey });
  }

  render() {
    switch (this.props.sqsStatus) {
      case 'ready':
        return <div>Loading...</div>;
      case 'active':
        return <BirthdayList birthdays={this.props.birthdays} />;
      case 'error':
      default:
        return <div>Could not connect to SQS</div>;
    }
  }
}

PresenterPage.propTypes = {
  sqsStatus: PropTypes.string.isRequired,
  birthdays: PropTypes.array.isRequired,
  accessKeyId: PropTypes.string,
  secretAccessKey: PropTypes.string,
};

PresenterPage.defaultProps = {
  accessKeyId: '',
  secretAccessKey: '',
};

export { PresenterPage as Pure };

export default connect((state) => {
  const routeSearch = get(state.routing, 'locationBeforeTransitions.search');
  const { accessKeyId, secretAccessKey } = queryString.parse(routeSearch);

  return {
    sqsStatus: state.app.presenter.sqsStatus,
    birthdays: state.app.presenter.birthdays,
    accessKeyId,
    secretAccessKey,
  };
}, {
  initSQS
})(PresenterPage);

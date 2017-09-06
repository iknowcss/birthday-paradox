import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import queryString from 'query-string';
import { initSQS } from './presenterActionCreators';
import PresenterFlow from './PresenterFlow';

class PresenterRoot extends Component {
  componentDidMount() {
    const { accessKeyId, secretAccessKey } = this.props;
    this.props.initSQS({ accessKeyId, secretAccessKey });
  }

  render() {
    return (
      <Switch>
        {this.props.sqsStatus === 'ready' ? (
          <Route exact path="/presenter" component={() => <div>Loading...</div>} />
        ) : null}

        {this.props.sqsStatus === 'active' ? (
          <Route path="/presenter" component={() => (
            <PresenterFlow birthdays={this.props.birthdays} />
          )} />
        ) : null}

        {this.props.sqsStatus === 'error' ? (
          <Route exact path="/presenter" component={() => <div>Error!</div>} />
        ) : null}

        <Redirect to="/presenter"/>
      </Switch>
    );
  }
}

PresenterRoot.propTypes = {
  sqsStatus: PropTypes.oneOf(['ready', 'active', 'error']).isRequired,
  birthdays: PropTypes.array.isRequired,
  accessKeyId: PropTypes.string,
  secretAccessKey: PropTypes.string,
};

PresenterRoot.defaultProps = {
  accessKeyId: '',
  secretAccessKey: '',
};

export { PresenterRoot as Pure };

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
})(PresenterRoot);

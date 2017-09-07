import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { initSQS } from './presenterActionCreators';
import PresenterFlow from './PresenterFlow';

class PresenterRoot extends Component {
  componentDidMount() {
    const hash = document.location.hash.split('?');
    const {
      accessKeyId = '',
      secretAccessKey = '',
    } = queryString.parse(hash.slice(1).join('?'));

    this.props.initSQS({ accessKeyId, secretAccessKey });
    document.location.hash = hash[0];
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
};

export { PresenterRoot as Pure };

export default connect(state => ({
  sqsStatus: state.app.presenter.sqsStatus,
  birthdays: state.app.presenter.birthdays,
}), {
  initSQS
})(PresenterRoot);

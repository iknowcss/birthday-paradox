import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import queryString from 'query-string';
import BirthdayList from './BirthdayList';
import { initSQS } from './presenterActionCreators';

class PresenterPage extends Component {
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
            <Switch>
              <Route exact path="/presenter" component={() => <div>
                <div>{this.props.birthdays.length} birthdays collected</div>
                <Link to="/presenter/graph">Start!</Link>
              </div>} />

              <Route exact path="/presenter/graph" component={() => (
                <BirthdayList birthdays={this.props.birthdays} />
              )} />

              <Redirect to="/presenter"/>
            </Switch>
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

PresenterPage.propTypes = {
  sqsStatus: PropTypes.oneOf(['ready', 'active', 'error']).isRequired,
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
    birthdays: state.app.presenter.birthdays.length ? state.app.presenter.birthdays : [
        { month: 1, day: 17 },
        { month: 1, day: 18 },
        { month: 1, day: 23 },
        { month: 1, day: 27 },
        { month: 1, day: 28 },
        { month: 1, day: 31 },
        { month: 2, day: 2 },
        { month: 2, day: 14 },
        { month: 2, day: 15 },
        { month: 3, day: 14 },
        { month: 3, day: 24 },
        { month: 3, day: 31 },
        { month: 4, day: 23 },
        { month: 4, day: 25 },
        { month: 4, day: 26 },
        { month: 7, day: 2 },
        { month: 7, day: 18 },
        { month: 8, day: 7 },
        { month: 8, day: 8 },
        { month: 8, day: 12 },
        { month: 8, day: 15 },
        { month: 8, day: 19 },
        { month: 9, day: 10 },
        { month: 10, day: 7 },
        { month: 10, day: 15 },
        { month: 11, day: 7 },
        { month: 12, day: 5 },
        { month: 12, day: 11 },
      ],
    accessKeyId,
    secretAccessKey,
  };
}, {
  initSQS
})(PresenterPage);

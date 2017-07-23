import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import AudiencePage from './audience/AudiencePage';
import PresenterPage from './presenter/PresenterPage';

const AppRoot = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/audience" />
        <Route path="/audience" component={AudiencePage} />
        <Route path="/presenter" component={PresenterPage} />
      </Route>
    </Router>
  </Provider>
);

AppRoot.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AppRoot;

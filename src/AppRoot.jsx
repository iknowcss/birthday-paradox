import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AudiencePage from './audience/AudiencePage';
import PresenterPage from './presenter/PresenterPage';

const AppRoot = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/audience" component={AudiencePage} />
        <Route path="/presenter" component={PresenterPage} />
        <Redirect to="/audience" />
      </Switch>
    </HashRouter>
  </Provider>
);

AppRoot.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AppRoot;

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducer from './reducer';
import AppRoot from './AppRoot';
import * as sqsService from './sqsService';

const enhancers = [applyMiddleware(thunk)];

/* eslint-disable no-underscore-dangle */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

// - Create the store and init services ----------------------------------------

const store = createStore(reducer, compose(...enhancers));
const history = syncHistoryWithStore(hashHistory, store);
sqsService.init(store);

// - Initial render ------------------------------------------------------------

const rootElement = document.getElementById('app'); // eslint-disable-line no-undef
ReactDOM.render(React.createElement(AppContainer, null,
  React.createElement(AppRoot, { store, history }),
), rootElement);

// - Hot re-render -------------------------------------------------------------

if (process.env === 'development' && module.hot) {
  module.hot.accept('./AppRoot', () => {
    const NextAppRoot = require('./AppRoot').default; // eslint-disable-line global-require
    ReactDOM.render(React.createElement(AppContainer, null,
      React.createElement(NextAppRoot, { store, history }),
    ), rootElement);
  });
}

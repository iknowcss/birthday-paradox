import 'react-mdl/extra/material';
import 'react-mdl/extra/material.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import './layout/main.scss';
import reducer from './reducer';
import AppRoot from './AppRoot';

const enhancers = [applyMiddleware(thunk)];

/* eslint-disable no-underscore-dangle */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const store = createStore(reducer, compose(...enhancers));

const rootElement = document.getElementById('app'); // eslint-disable-line no-undef

// - Initial render --------------------------------------------------------------------------------

ReactDOM.render(React.createElement(AppContainer, null,
  React.createElement(AppRoot, { store }),
), rootElement);

// - Hot re-render ---------------------------------------------------------------------------------

// TODO: cjenkins include this only when process.env.NODE_ENV=development
if (module.hot) {
  module.hot.accept('./AppRoot', () => {
    const NextAppRoot = require('./AppRoot').default; // eslint-disable-line global-require
    ReactDOM.render(React.createElement(AppContainer, null,
      React.createElement(NextAppRoot, { store, history }),
    ), rootElement);
  });
}

// var sqs = new AWS.SQS({
//   apiVersion: '2012-11-05'
// });

/// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessage-property
// var params = {
//   MessageBody: 'STRING_VALUE', /* required */
//   QueueUrl: 'STRING_VALUE', /* required */
//   DelaySeconds: 0,
//   MessageAttributes: {
//     '<String>': {
//       DataType: 'STRING_VALUE', /* required */
//       BinaryListValues: [
//         new Buffer('...') || 'STRING_VALUE',
//         /* more items */
//       ],
//       BinaryValue: new Buffer('...') || 'STRING_VALUE',
//       StringListValues: [
//         'STRING_VALUE',
//         /* more items */
//       ],
//       StringValue: 'STRING_VALUE'
//     },
//     /* '<String>': ... */
//   },
//   MessageDeduplicationId: 'STRING_VALUE',
//   MessageGroupId: 'STRING_VALUE'
// };
// sqs.sendMessage(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
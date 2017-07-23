import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  app: appReducer,
});

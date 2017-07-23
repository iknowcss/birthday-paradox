import { combineReducers } from 'redux';
import audienceReducer from './audience/audienceReducer';
import presenterReducer from './presenter/presenterReducer';

export default combineReducers({
  audience: audienceReducer,
  presenter: presenterReducer,
});

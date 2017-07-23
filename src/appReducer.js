import { combineReducers } from 'redux';
import audienceReducer from './audience/audienceReducer';

export default combineReducers({
  audience: audienceReducer,
});


// import uniqBy from 'lodash/uniqBy'
// import actionTypes from './actionTypes';
//
// const DEFAULT_STATE = {
//   birthdays: [],
//   polling: false,
// };
//
// export default (state = DEFAULT_STATE, action = {}) => {
//   switch (action.type) {
//     case actionTypes.message.POLL_INIT:
//       return { ...state, polling: true };
//     case actionTypes.message.MESSAGE_RECEIVE_SUCCESS:
//       return {
//         ...state,
//         birthdays: uniqBy([
//           ...state.birthdays,
//           ...action.messages.map(m => ({
//             id: m.messageId,
//             month: m.month,
//             day: m.day,
//           })),
//         ], 'id'),
//       };
//     default:
//       return state;
//   }
// };

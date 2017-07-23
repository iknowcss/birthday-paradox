import uniqBy from 'lodash/uniqBy'
import actionTypes from '../actionTypes';

const {
  INIT_SQS,
  INIT_SQS_ERROR,
  SQS_POLL_SUCCESS,
} = actionTypes.presenter;

const DEFAULT_STATE = {
  sqsStatus: 'ready',
  birthdays: [],
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case INIT_SQS:
      return { ...state, sqsStatus: 'active' };
    case INIT_SQS_ERROR:
      return { ...state, sqsStatus: 'error' };
    case SQS_POLL_SUCCESS:
      return {
        ...state,
        birthdays: uniqBy([
          ...state.birthdays,
          ...action.messages.map(m => ({
            id: m.messageId,
            month: m.month,
            day: m.day,
          })),
        ], 'id'),
      };
    default:
      return state;
  }
};

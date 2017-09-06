import uniqBy from 'lodash/uniqBy'
import actionTypes from '../actionTypes';

const {
  INIT_SQS,
  INIT_SQS_ERROR,
  SQS_POLL_SUCCESS,
  PAGE_PREV,
  PAGE_NEXT,
} = actionTypes.presenter;

const DEFAULT_STATE = {
  sqsStatus: 'ready',
  birthdays: [
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
  page: 1,
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
    case PAGE_PREV:
      return { ...state, page: Math.max(state.page - 1, 1) };
    case PAGE_NEXT:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

import actionTypes from '../actionTypes';

const {
  SUBMIT_BIRTHDAY_START,
  SUBMIT_BIRTHDAY_SUCCESS,
  SUBMIT_BIRTHDAY_ERROR,
  SUBMIT_BIRTHDAY_RESET,
} = actionTypes.audience;

const DEFAULT_STATE = {
  submitStatus: 'ready',
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case SUBMIT_BIRTHDAY_START:
      return { ...state, submitStatus: 'pending' };
    case SUBMIT_BIRTHDAY_SUCCESS:
      return { ...state, submitStatus: 'success' };
    case SUBMIT_BIRTHDAY_ERROR:
      return { ...state, submitStatus: 'error' };
    case SUBMIT_BIRTHDAY_RESET:
      return { ...state, submitStatus: 'ready' };
    default:
      return state;
  }
};

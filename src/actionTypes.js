export default {
  message: {
    POLL_INIT: '@@birthday-paradox/message/POLL_INIT',
    MESSAGE_RECEIVE_SUCCESS: '@@birthday-paradox/message/MESSAGE_RECEIVE_SUCCESS',
  },
  audience: {
    SUBMIT_BIRTHDAY_START: '@@birthday-paradox/audience/SUBMIT_BIRTHDAY_START',
    SUBMIT_BIRTHDAY_SUCCESS: '@@birthday-paradox/audience/SUBMIT_BIRTHDAY_SUCCESS',
    SUBMIT_BIRTHDAY_ERROR: '@@birthday-paradox/audience/SUBMIT_BIRTHDAY_ERROR',
    SUBMIT_BIRTHDAY_RESET: '@@birthday-paradox/audience/SUBMIT_BIRTHDAY_RESET',
  },
  presenter: {
    INIT_SQS: '@@birthday-paradox/presenter/INIT_SQS',
    INIT_SQS_ERROR: '@@birthday-paradox/presenter/INIT_SQS_ERROR',
    SQS_POLL_SUCCESS: '@@birthday-paradox/presenter/SQS_POLL_SUCCESS',
    PAGE_PREV: '@@birthday-paradox/presenter/PAGE_PREV',
    PAGE_NEXT: '@@birthday-paradox/presenter/PAGE_NEXT',
  }
};

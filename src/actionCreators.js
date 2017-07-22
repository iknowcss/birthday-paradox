import actionTypes from './actionTypes';

export function messageReceiveSuccess(messages) {
  return {
    type: actionTypes.message.MESSAGE_RECEIVE_SUCCESS,
    messages,
  }
}

export function pollInit() {
  return { type: actionTypes.message.POLL_INIT };
}

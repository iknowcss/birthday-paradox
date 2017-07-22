import actionTypes from './actionTypes';
import * as sqsService from './sqsService';

export function messageReceiveSuccess(messages) {
  return {
    type: actionTypes.message.MESSAGE_RECEIVE_SUCCESS,
    messages,
  }
}

export function pollInit() {
  sqsService.startPolling();
  return { type: actionTypes.message.POLL_INIT };
}

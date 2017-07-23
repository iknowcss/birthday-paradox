import sqsService from '../sqsService';
import actionTypes from '../actionTypes';

const {
  INIT_SQS,
  INIT_SQS_ERROR,
  SQS_POLL_SUCCESS,
} = actionTypes.presenter;

export const initSQS = (options) => (dispatch, getState) => {
  if (getState().app.presenter.sqsStatus === 'ready') {
    try {
      sqsService.init(options, m => dispatch(sqsPollSuccess(m)));
      dispatch({ type: INIT_SQS });
    } catch (e) {
      dispatch({ type: INIT_SQS_ERROR });
    }
  }
};

export function sqsPollSuccess(newMessages) {
  return { type: SQS_POLL_SUCCESS, messages: newMessages };
}

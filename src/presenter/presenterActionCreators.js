import sqsService from '../sqsService';
import actionTypes from '../actionTypes';

const {
  INIT_SQS,
  INIT_SQS_ERROR,
  SQS_POLL_SUCCESS,
  PAGE_PREV,
  PAGE_NEXT,
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

export const pageNext = () => ({ type: PAGE_NEXT });

export const pagePrev = () => ({ type: PAGE_PREV });

import actionTypes from '../actionTypes';
import simpleFetch from '../util/simpleFetch';

const SUBMIT_URL = 'https://sjzr86kah2.execute-api.ap-southeast-2.amazonaws.com/prod/processSubmittedBirthday';

const {
  SUBMIT_BIRTHDAY_START,
  SUBMIT_BIRTHDAY_SUCCESS,
  SUBMIT_BIRTHDAY_ERROR,
} = actionTypes.audience;

export const submitBirthday = birthday => async (dispatch) => {
  dispatch({ type: SUBMIT_BIRTHDAY_START });

  let result;
  try {
    result = await simpleFetch(SUBMIT_URL, {
      method: 'POST',
      body: birthday
    });
  } catch (e) {
    result = { ok: false, body: e.stack };
  }

  if (!result.ok) {
    dispatch({
      type: SUBMIT_BIRTHDAY_ERROR,
      statusCode: result.statusCode,
      body: result.body,
    });
  } else {
    dispatch({ type: SUBMIT_BIRTHDAY_SUCCESS });
  }
};

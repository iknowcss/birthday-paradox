import actionTypes from '../actionTypes';

const SUBMIT_URL = 'https://sjzr86kah2.execute-api.ap-southeast-2.amazonaws.com/prod/processSubmittedBirthday';

const {
  SUBMIT_BIRTHDAY_START,
  SUBMIT_BIRTHDAY_SUCCESS,
  SUBMIT_BIRTHDAY_ERROR,
} = actionTypes.audience;

const foo = (url, { body, ...options }) => fetch(url, {
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
  ...options,
})
  .then(async result => {
    console.log(result);
    return {
      ok: result.ok,
      statusCode: result.status,
      body: await result.json(),
    };
  });

export const submitBirthday = birthday => async (dispatch) => {
  dispatch({ type: SUBMIT_BIRTHDAY_START });

  let result;
  try {
    result = await foo(SUBMIT_URL, {
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

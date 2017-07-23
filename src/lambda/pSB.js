'use strict';

const AWS = require('aws-sdk');
const TASK_QUEUE_URL = process.env.TASK_QUEUE_URL;
const AWS_REGION = process.env.AWS_REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
// I know I know, but I'm lazy. I will fix this later.
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

console.log('[pSB] Loading function');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: AWS_REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

function sqsCall(method, params) {
  console.info(`[pSB] SQS ${method} - start`);
  return new Promise((res, rej) => {
    sqs[method](params, (err, data) => {
      if (err) {
        console.error(`[pSB] SQS ${method} - failure`, err, err.stack);
        rej(err);
      } else {
        console.info(`[pSB] SQS ${method} - success`);
        res(data);
      }
    });
  });
}

function submitBirthdayToSqs(birthday) {
  return sqsCall('sendMessage', {
    MessageBody: JSON.stringify(birthday),
    QueueUrl: TASK_QUEUE_URL,
  })
    .then(() => {
      console.info('[pSB] Added birthday to queue');
      return { body: { success: true} };
    });
}

function handlePost(body) {
  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    console.log('[pSB] Failed to parse JSON');
    return Promise.resolve({
      statusCode: 400,
      body: { error: 'Invalid JSON' }
    });
  }

  // Validate month range
  if (!data.month
    || typeof data.month !== 'number'
    || data.month < 1
    || data.month > 12
  ) {
    return Promise.resolve({
      statusCode: 400,
      body: { error: `Field "month" is not a valid number from 1 - 12`}
    });
  }

  // Validate day range
  if (!data.day
    || typeof data.day !== 'number'
    || data.day < 1
    || data.day > 31
  ) {
    return Promise.resolve({
      statusCode: 400,
      body: { error: `Field "day" is not a valid number from 1 - 31`}
    });
  }

  // Validate day for month
  if (([4, 6, 9, 11].indexOf(data.month) >= 0 && data.day > 30)
    || (data.month === 2 && data.day > 29)
  ) {
    return Promise.resolve({
      statusCode: 400,
      body: { error: `Field "day" value "${data.day}" is not a valid for month "${data.month}"`}
    });
  }

  return submitBirthdayToSqs({ month: data.month, day: data.day });
}

function processRequest(httpMethod, body) {
  switch (httpMethod) {
    case 'POST':
      return handlePost(body);
    default:
      return Promise.resolve({
        statusCode: 400,
        body: { error: `Unsupported method "${httpMethod}"` }
      });
  }
}

exports.handler = (event, context, callback) => {
  console.log('[pSB] Received event:', JSON.stringify(event, null, 2));

  processRequest(event.httpMethod, event.body)
    .catch(err => {
      console.log('[pSB] processRequest rejected:', JSON.stringify(err, null, 2));
      return {
        statusCode: 500,
        body: { error: err }
      }
    })
    .then(result => {
      console.log('[pSB] processRequest resolved');
      callback(null, {
        statusCode: result.statusCode || 200,
        body: JSON.stringify(result.body),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    });
};

import { pollInit, messageReceiveSuccess } from './actionCreators';

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  endpoint: 'https://sqs.ap-southeast-2.amazonaws.com',
  region: 'ap-southeast-2',
});

const QUEUE_URL = 'https://sqs.ap-southeast-2.amazonaws.com/784116978440/birthday-paradox';

const sqsCall = (method, params) => {
  console.info(`[sqsService] ${method} - start`);
  return new Promise((res, rej) => {
    sqs[method](params, (err, data) => {
      if (err) {
        console.error(`[sqsService] ${method} - failure`, err, err.stack);
        rej(err);
      } else {
        console.info(`[sqsService] ${method} - success`);
        res(data);
      }
    });
  });
};

export function sendMessage(message) {
  return sqsCall('sendMessage', {
    MessageBody: JSON.stringify(message),
    QueueUrl: QUEUE_URL,
  });
}

export async function receiveMessages() {
  const { Messages } = await sqsCall('receiveMessage', {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 10,
  });

  return Messages.map(m => ({
    messageId: m.MessageId,
    receiptHandle: m.ReceiptHandle,
    ...JSON.parse(m.Body),
  }));
}

export function deleteMessages(messages) {
  return sqsCall('deleteMessageBatch', {
    QueueUrl: QUEUE_URL,
    Entries: messages.map(m => ({
      Id: m.messageId,
      ReceiptHandle: m.receiptHandle,
    })),
  });
}

let initalised = false;
export async function init(store) {
  if (initalised) return;

  store.dispatch(pollInit());
  initalised = true;
  for (var i = 0; i < 3; i++) {
    const newMessages = await receiveMessages();
    if (newMessages.length > 0) {
      store.dispatch(messageReceiveSuccess(newMessages));
      await deleteMessages(newMessages);
    }
  }
}

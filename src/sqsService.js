const QUEUE_URL = 'https://sqs.ap-southeast-2.amazonaws.com/784116978440/birthday-paradox';

function sqsCall(method, params) {
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
}

async function receiveMessages() {
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

function deleteMessages(messages) {
  return sqsCall('deleteMessageBatch', {
    QueueUrl: QUEUE_URL,
    Entries: messages.map(m => ({
      Id: m.messageId,
      ReceiptHandle: m.receiptHandle,
    })),
  });
}

let receiveCallback;
let sqs;
export default {
  async init(options, cb) {
    const sqsConfig = {
      apiVersion: '2012-11-05',
      endpoint: 'https://sqs.ap-southeast-2.amazonaws.com',
      region: 'ap-southeast-2',
      ...options
    };

    if (!receiveCallback) {
      receiveCallback = cb;
      sqs = new AWS.SQS(sqsConfig);

      while (true) {
        const newMessages = await receiveMessages();
        if (newMessages.length > 0) {
          receiveCallback(newMessages);
          await deleteMessages(newMessages);
        }
      }
    }
  }
};

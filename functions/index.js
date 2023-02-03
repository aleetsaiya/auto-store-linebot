'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const functions = require('firebase-functions');
const lineKeys = require('./line-keys');
const testingRouter = require('./testingRouter');
const {
  processMessage,
  isValidMessage,
  createLineMessage,
  addDataToDB,
  formatDate,
} = require('./utils');

// create line client
const client = new line.Client(lineKeys);

// create express app
const app = express();
const PORT = 3000;

app.use(testingRouter);
// add line middlewares to webhook handler
app.use('/webhook', line.middleware(lineKeys));
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  const promises = events.map((event) => {
    // ignore non-text-message
    if (event.type !== 'message' || event.message.type !== 'text')
      return Promise.resolve(null);

    // check if the message is a valid message
    const errMessage = '❌ 傳送失敗\n請依照: "客戶 產品 數量" 格式傳送訊息';

    if (!isValidMessage(event.message.text)) {
      return client.replyMessage(
        event.replyToken,
        createLineMessage(errMessage)
      );
    }

    // update the database
    const processedData = processMessage(event.message.text);
    // Firebase functions server is locate at US
    // so we add 8 hourses (480 mins) to our date
    // to be the Taiwan date instance
    const timeDifference = 480;
    const currentTime = new Date(event.timestamp + timeDifference * 60 * 1000);
    const { month, day } = formatDate(currentTime);
    const location = processedData.product + '/' + month + day;
    addDataToDB(location, processedData.company, processedData.count);

    // if update success, send update success message back to line
    const message = `✅ 傳送成功\n產品: ${processedData.product}\n客戶: ${processedData.company} \n數量: ${processedData.count}`;
    return client.replyMessage(event.replyToken, createLineMessage(message));
  });
  // send JSON response to client
  Promise.all(promises)
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// setting the firebase server route to: {firebaseUrl}/api/{appRoute}
exports.api = functions.https.onRequest(app);

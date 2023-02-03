const express = require('express');
const {
  processMessage,
  formatDate,
  addDataToDB,
  isValidMessage,
} = require('./utils');

const router = express.Router();

router.get('/greet', (req, res) => {
  res.send('Hello ~');
});

// only for testing if the database connect is success
// sample: ?message=宗初測試 波龍 20
router.get('/tsdb', (req, res) => {
  const query = req.query;

  console.log({ query });

  const errMessage = '傳送失敗。請依照: "客戶 產品 數量" 格式傳送訊息';

  if (!isValidMessage(query.message)) {
    res.send(errMessage);
    console.log('Update failed');
    return;
  }

  const processedData = processMessage(query.message);
  const currentTime = new Date();
  const { month, day } = formatDate(currentTime);
  const location = processedData.product + '/' + month + day;
  addDataToDB(location, processedData.company, processedData.count);

  console.log('Update success');
});

module.exports = router;

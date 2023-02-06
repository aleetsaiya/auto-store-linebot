import { Router, Request, Response } from 'express';
import { middleware, Client, TextMessage, WebhookEvent } from '@line/bot-sdk';
import { add } from '../database';
import lineKeys from '../keys/line-keys.json';

interface MessageInfo {
  company: string;
  product: string;
  count: number;
}

function createLineMessage(text: string): TextMessage {
  return { type: 'text', text };
}

function getMessageInfo(message: TextMessage): MessageInfo | null {
  const result = message.text.split(' ');
  if (result.length !== 3) return null;
  if (isNaN(parseInt(result[2]))) return null;
  return {
    company: result[0],
    product: result[1],
    count: parseInt(result[2]),
  };
}

// The server is locate at US so we need to
// add 8 hours to create the Date
function getTaiwanDate(timestamp: number) {
  const timeDifference = 480;
  return new Date(timestamp + timeDifference * 60 * 1000);
}

function getMonthAndDay(date: Date) {
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;
  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day;
  return { month, day };
}

const lineRouter = Router();

// create line client
const client = new Client(lineKeys);

lineRouter.use('/webhook', middleware(lineKeys));

lineRouter.post('/webhook', (req: Request, res: Response) => {
  const events = req.body.events;
  const promises = events.map((event: WebhookEvent) => {
    // ignore non-text-message
    if (event.type !== 'message' || event.message.type !== 'text')
      return Promise.resolve(null);

    const { timestamp, message, replyToken } = event;
    const info = getMessageInfo(message);

    if (info === null) {
      const errText = '❌ 傳送失敗\n請依照: "客戶 產品 數量" 格式傳送訊息';
      return client.replyMessage(replyToken, createLineMessage(errText));
    }

    const { product, company, count } = info;
    const { month, day } = getMonthAndDay(getTaiwanDate(timestamp));
    const dbPath = product + '/' + month + day;

    add(dbPath, company, count);

    const successText = `✅ 傳送成功\n產品: ${product}\n客戶: ${company} \n數量: ${count}`;
    return client.replyMessage(replyToken, createLineMessage(successText));
  });
  // send JSON response to client
  Promise.all(promises)
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

export { lineRouter };

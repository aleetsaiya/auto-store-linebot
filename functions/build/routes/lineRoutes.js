"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineRouter = void 0;
const express_1 = require("express");
const bot_sdk_1 = require("@line/bot-sdk");
const database_1 = require("../database");
const line_keys_json_1 = __importDefault(require("../keys/line-keys.json"));
function createLineMessage(text) {
    return { type: 'text', text };
}
function getMessageInfo(message) {
    const result = message.text.split(' ');
    if (result.length !== 3)
        return null;
    if (isNaN(parseInt(result[2])))
        return null;
    return {
        company: result[0],
        product: result[1],
        count: parseInt(result[2]),
    };
}
// The server is locate at US so we need to
// add 8 hours to create the Date
function getTaiwanDate(timestamp) {
    const timeDifference = 480;
    return new Date(timestamp + timeDifference * 60 * 1000);
}
function getMonthAndDay(date) {
    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;
    let day = date.getDate().toString();
    day = day.length === 1 ? '0' + day : day;
    return { month, day };
}
const lineRouter = (0, express_1.Router)();
exports.lineRouter = lineRouter;
// create line client
const client = new bot_sdk_1.Client(line_keys_json_1.default);
lineRouter.use('/webhook', (0, bot_sdk_1.middleware)(line_keys_json_1.default));
lineRouter.post('/webhook', (req, res) => {
    const events = req.body.events;
    const promises = events.map((event) => {
        // ignore non-text-message
        if (event.type !== 'message' || event.message.type !== 'text')
            return Promise.resolve(null);
        const { timestamp, message, replyToken } = event;
        const data = getMessageInfo(message);
        if (data === null) {
            const errText = '❌ 傳送失敗\n請依照: "客戶 產品 數量" 格式傳送訊息';
            return client.replyMessage(replyToken, createLineMessage(errText));
        }
        const { product, company, count } = data;
        const { month, day } = getMonthAndDay(getTaiwanDate(timestamp));
        const dbPath = product + '/' + month + day;
        (0, database_1.add)(dbPath, company, count);
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

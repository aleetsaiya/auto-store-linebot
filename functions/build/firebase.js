"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebas_admin_key_json_1 = __importDefault(require("./keys/firebas-admin-key.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebas_admin_key_json_1.default),
    databaseURL: 'https://auto-store-line-bot-default-rtdb.asia-southeast1.firebasedatabase.app',
});
exports.default = firebase_admin_1.default;

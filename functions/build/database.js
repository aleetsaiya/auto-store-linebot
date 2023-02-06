"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const firebase_1 = __importDefault(require("./firebase"));
function add(path, key, value) {
    const db = firebase_1.default.database();
    const ref = db.ref(path);
    ref.update({
        [key]: value,
    });
}
exports.add = add;

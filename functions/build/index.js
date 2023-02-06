"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_functions_1 = require("firebase-functions");
const lineRoutes_1 = require("./routes/lineRoutes");
// create express
const app = (0, express_1.default)();
const PORT = 3000;
app.use(lineRoutes_1.lineRouter);
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
// Set the firebase server route to: {firebaseUrl}/api/{appRoute}
exports.api = firebase_functions_1.https.onRequest(app);

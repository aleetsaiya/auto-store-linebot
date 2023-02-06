import express from 'express';
import { https } from 'firebase-functions';
import { lineRouter } from './routes/lineRoutes';

// create express
const app = express();
const PORT = 3000;

app.use(lineRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Set the firebase server route to: {firebaseUrl}/api/{appRoute}
exports.api = https.onRequest(app);

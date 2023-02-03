const admin = require('firebase-admin');

const serviceAccount = require('./firebas-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://auto-store-line-bot-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = admin;

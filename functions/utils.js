const firebaseAdmin = require('firebase-admin');
const firebaseApp = require('./firebase');

function createLineMessage(message) {
  return { type: 'text', text: message };
}

function isValidMessage(message) {
  const chunks = message.split(' ');
  // not valid if the third section is not a number
  if (chunks.length !== 3) return false;
  if (isNaN(parseInt(chunks[2]))) return false;
  return true;
}

function processMessage(message) {
  const [company, product, count] = message.split(' ');
  return {
    company,
    product,
    count,
  };
}

function formatDate(date) {
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;
  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day;
  return { month, day };
}

// This method will "append" new data to database
// rather than overwrite it
function addDataToDB(location, key, value) {
  const db = firebaseAdmin.database(firebaseApp);
  const ref = db.ref(location);
  ref.update({
    [key]: value,
  });
}

module.exports = {
  isValidMessage,
  createLineMessage,
  processMessage,
  addDataToDB,
  formatDate,
};

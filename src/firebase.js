import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBIMwyekCjrE6AyN54QUIENhy_A-KgWw94',
  authDomain: 'auto-store-line-bot.firebaseapp.com',
  projectId: 'auto-store-line-bot',
  storageBucket: 'auto-store-line-bot.appspot.com',
  messagingSenderId: '32754232419',
  appId: '1:32754232419:web:f3ddd1980fb5b4aea3dc56',
  databaseURL:
    'https://auto-store-line-bot-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
export default app;

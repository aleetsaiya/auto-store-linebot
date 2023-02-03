import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { DBContextProvider } from './context/DBContext';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <DBContextProvider>
      <App />
    </DBContextProvider>
  </BrowserRouter>
);

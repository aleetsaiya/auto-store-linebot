import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { DBContextProvider } from './context/DBContext';
import { AuthContextProvider } from './context/AuthContext';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);
  root.render(
    <HashRouter>
      <AuthContextProvider>
        <DBContextProvider>
          <App />
        </DBContextProvider>
      </AuthContextProvider>
    </HashRouter>
  );
}

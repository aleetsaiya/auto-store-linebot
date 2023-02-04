import React from 'react';
import Box from '@mui/material/Box';
import ProtectedRoute from './components/ProtectedRoute';
import ProductPage from './components/ProductPage';
import ProductContentsPage from './components/ProductContentsPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <React.Fragment>
      <Box>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductContentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:productName"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </React.Fragment>
  );
};

export default App;

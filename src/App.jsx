import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ProductPage from './components/ProductPage';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const xsWidth = '100vw';
  const mdWidth = `calc(${xsWidth} - 200px)`;

  return (
    <>
      <ProductList />
      <Box
        sx={{
          width: {
            xs: xsWidth,
            md: mdWidth,
          },
          marginLeft: {
            xs: '0px',
            md: '200px',
          },
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productName" element={<ProductPage />} />
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
    </>
  );
};

export default App;

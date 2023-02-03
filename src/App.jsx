import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ProductPage from './components/ProductPage';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ProductList />
      <Box sx={{ width: 'calc(100vw-200px)', marginLeft: '200px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productName" element={<ProductPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;

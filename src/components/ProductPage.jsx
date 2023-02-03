import React from 'react';
import Container from '@mui/material/Container';
import ProductTable from './ProductTable';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';

const ProductPage = () => {
  const params = useParams();
  const { products } = useDB();
  const currentProduct = products[params.productName];

  const rows = [];
  for (let date in currentProduct) {
    for (let company in currentProduct[date]) {
      rows.push({ date, company, count: currentProduct[date][company] });
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ margin: '1rem' }}>
        {translateToChinese(params.productName)}
      </Typography>
      <ProductTable rows={rows} />
      <GutterBottom />
    </Container>
  );
};

const GutterBottom = () => <div style={{ height: '1.5rem' }}></div>;

export default ProductPage;

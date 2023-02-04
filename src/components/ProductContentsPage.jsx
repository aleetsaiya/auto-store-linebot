import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';
import ProductList from './ProductList';

const ProductContentsPage = () => {
  const { products } = useDB();
  const navigate = useNavigate();
  const xsWidth = '100vw';
  const mdWidth = `calc(${xsWidth} - 200px)`;

  return (
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
      <ProductList />
      <Container sx={{ marginTop: '2rem' }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          產品列表
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          {Object.keys(products).map((product, index) => (
            <Paper
              key={index}
              onClick={() => navigate(`/products/${product}`)}
              sx={{
                marginBottom: {
                  xs: '1rem',
                  md: 0,
                },
                width: '200px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {translateToChinese(product)}
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductContentsPage;

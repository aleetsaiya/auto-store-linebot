import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import UndoIcon from '@mui/icons-material/Undo';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';

const ProductList = () => {
  const navigate = useNavigate();
  const { products } = useDB();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          position: 'fixed',
          top: 0,
          left: 0,
          width: 200,
          minHeight: '100vh',
          bgcolor: 'background.paper',
        }}
        boxShadow
      >
        <nav aria-label="main mailbox folders">
          <List
            subheader={<ListSubheader component="h3">產品列表</ListSubheader>}
          >
            <ListItemButton onClick={() => handleClick('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="總覽" />
            </ListItemButton>
            <Divider />
            {Object.keys(products).map((p, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleClick(`/products/${p}`)}>
                  <ListItemText primary={translateToChinese(p)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
      <IconButton
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          position: 'fixed',
          right: '1.2rem',
          bottom: '1.2rem',
        }}
        aria-label="back"
        color="primary"
        onClick={() => handleClick('/')}
      >
        <UndoIcon />
      </IconButton>
    </>
  );
};

export default ProductList;

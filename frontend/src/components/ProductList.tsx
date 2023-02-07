import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import UndoIcon from '@mui/icons-material/Undo';
import { Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const db = useDB();

  const products = (db && db.products) || {};
  const isProductContentsRoute = location.pathname === '/products';

  function handleClick(path: string) {
    navigate(path);
  }

  async function handleSignOut() {
    if (auth) {
      const res = await auth.signOut();
      if (res.status === 'SUCCESS') {
        toast.success('登出成功');
      } else {
        toast.error('登出失敗');
      }
    }
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
      >
        <nav aria-label="main mailbox folders">
          <List
            subheader={<ListSubheader component="h3">產品列表</ListSubheader>}
          >
            <ListItemButton onClick={() => handleClick('/products')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="總覽" />
            </ListItemButton>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="登出" />
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
      {!isProductContentsRoute && (
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
          onClick={() => handleClick('/products')}
        >
          <UndoIcon />
        </IconButton>
      )}
      {isProductContentsRoute && (
        <IconButton
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
            position: 'fixed',
            right: '.8rem',
            bottom: '1.2rem',
          }}
          aria-label="logout"
          color="primary"
          onClick={handleSignOut}
        >
          <LogoutIcon />
        </IconButton>
      )}
    </>
  );
};

export default ProductList;

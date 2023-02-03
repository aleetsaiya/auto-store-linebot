import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';
import Divider from '@mui/material/Divider';

const ProductList = () => {
  const navigate = useNavigate();

  const { products } = useDB();

  function handleClick(productName) {
    navigate(`/products/${productName}`);
  }

  return (
    <Box
      sx={{
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
        <List subheader={<ListSubheader component="h3">商品</ListSubheader>}>
          {Object.keys(products).map((p, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(p)}>
                <ListItemText primary={translateToChinese(p)} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
      {/* <Divider /> */}
      {/* <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav> */}
    </Box>
  );
};

export default ProductList;

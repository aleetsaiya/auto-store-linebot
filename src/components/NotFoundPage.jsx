import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ margin: '2rem' }}>
        404 錯誤
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        無法找到您訪問的頁面
      </Typography>
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}
      >
        回首頁
      </Button>
    </Container>
  );
};

export default NotFoundPage;

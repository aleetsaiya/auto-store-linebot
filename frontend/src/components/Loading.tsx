import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

const Loading = () => {
  return (
    <Container
      sx={{
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={50} />
    </Container>
  );
};

export default Loading;

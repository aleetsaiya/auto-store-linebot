import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Loading from './Loading';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = auth === null || auth.loading;
  const isLogged = auth !== null && auth.user;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (auth) {
      const { status, message } = await auth.signIn(email, password);
      if (status === 'SUCCESS') {
        navigate('/products');
        toast.success('登錄成功');
      } else {
        const errMsg = message.split('/')[1].slice(0, -2);
        if (errMsg === 'user-not-found' || errMsg === 'wrong-password')
          toast.error('電子信箱或是密碼錯誤');
        else toast.error('登錄失敗');
        console.log('err msg:', message);
      }
      setEmail('');
      setPassword('');
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return isLoading ? (
    <Loading />
  ) : isLogged ? (
    <Navigate to="/products" />
  ) : (
    <Container
      sx={{
        marginTop: '2rem',
        textAlign: 'center',
      }}
    >
      <Paper
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1.5rem',
          minHeight: '400px',
        }}
      >
        <Box sx={{ width: '80%', margin: '1.5rem auto 0 auto' }}>
          <Typography component="h3" variant="h4" sx={{ marginBottom: '2rem' }}>
            登錄
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <TextField
                required
                id="email"
                label="電子信箱"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                required
                id="password"
                label="密碼"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
              >
                登錄
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

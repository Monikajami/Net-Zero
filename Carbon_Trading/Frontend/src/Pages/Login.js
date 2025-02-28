import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';  // Import Axios
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Success state for Snackbar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Check if token is issued
      const token = response.data.token;
      if (token) {
        console.log('Token issued:', token); // Console message to confirm token issuance
        localStorage.setItem('token', token); // Store token for future use
        setSuccess(true); // Show success Snackbar
        setTimeout(() => navigate('/home'), 1500); // Delay navigation to show Snackbar
      } else {
        setError('Token not issued. Please try again.');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };
  const handleClose = () => {
    setSuccess(false); // Close the Snackbar
  };
  return (
    <Box className={styles['login-container']} sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: '16px' }}>
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
        Don't have an account? 
        <Link href="/signup" sx={{ marginLeft: '5px' }}>
          Sign up here
        </Link>
      </Typography>
      {/* Snackbar for success notification */}
      <Snackbar 
        open={success} 
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position in top-right corner
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Login;
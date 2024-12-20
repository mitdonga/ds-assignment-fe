import React, { useState } from 'react';
import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  Link, 
  Grid, 
  Box, 
  Typography 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import backend from '../services/backend';
import { toast } from 'react-toastify';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await backend.login(data.email, data.password);
      if (response.status === 200){
        navigate('/dashboard');
        toast.success('Logged in successfully');
      }
    } catch (err) {
      toast.error(err.data?.message || 'Something went wrong');
    }
  };

  const updateData = (event) => {
    const { name, value } = event.target;
    setData({...data, [name]: value});
  }

  return (
    <Box> 
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            value={data.email}
            onChange={updateData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={data.password}
            onChange={updateData}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
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

export default function SignUp() {
  const params = new URLSearchParams(location.search);
  const [data, setData] = useState({ name: '', email: params.get('email'), password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await backend.signup(data.name, data.email, data.password, params.get('ref'));
      if (response.status === 200) {
        toast.success('Signed up successfully');
        navigate('/login');
      }
    } catch (err) {
      const errors = err.data?.errors;
      if (errors && errors.length > 0) {
        errors.forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(err.data?.message || 'Something went wrong');
      }
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                autoComplete="name"
                value={data.name}
                onChange={updateData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type='email'
                value={data.email}
                disabled={params.get('email').length > 0}
                onChange={updateData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={data.password}
                onChange={updateData}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
import React, { useState } from 'react';
import { Box, TextField, Button, Typography,  Grid2 as Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backend from '../services/backend';

export default function Invite() {
  const [email, setEmail] = useState('');

  const handleInvite = async () => {
    try {
      const response = await backend.sendInvite(email);
      if (response.status === 200) {
        toast.success('Invite sent successfully');
        setEmail(''); 
      } else {
        toast.error('Failed to send invite');
      }
    } catch (error) {
      console.error('Invite error', error);
      toast.error(error.data?.error || 'Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Invite New Member
      </Typography>
      <Grid container spacing={2} sx={{ width: '500px' }}>
        <Grid size={9}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Invitee Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid size={3}>
          <Button
            size='large'
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleInvite}
          >
            Invite
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
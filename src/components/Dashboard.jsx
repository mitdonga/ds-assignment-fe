import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backend from '../services/backend';
import Members from './Members';
import Invite from './Invite';

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await backend.logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchMembers() {
    const data = await backend.fetchMembers();
    setMembers(data.users);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DirectShifts
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome To DirectShifts
        </Typography>
        <Invite />
        {members.length > 0 ? (
          <Members members={members} />
        ) : 
          <Box>
            <Typography variant="h4" gutterBottom>
              No members yet
            </Typography>
          </Box>
        }
      </Container>
    </Box>
  );
}
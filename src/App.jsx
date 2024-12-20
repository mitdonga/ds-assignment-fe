import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import { 
  Container 
} from '@mui/material';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      <Container maxWidth='xl'>
        <Router>
          <Routes />
        </Router>
        <ToastContainer />
      </Container>
  );
}

export default App;
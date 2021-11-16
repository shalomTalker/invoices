import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from './components/Header';
import Copyright from './components/Copright';


function App({ children }) {

  return (
    <Container component="main">
      <CssBaseline />
      <Header />
      {children}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default withAuthenticator(App);

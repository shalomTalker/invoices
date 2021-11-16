import Amplify from 'aws-amplify';
import config from './aws-exports';

import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Form from './pages/Form';
import { Provider as AuthProvider, useAuth } from './context/AuthContext'


Amplify.configure(config);

const theme = createTheme();

function RequireAuth({ children }) {
  let auth = useAuth();
  console.log(auth.state)
  if (!auth.state.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" />;
  }

  return children;
}


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<Form />} />
          </Routes>
        </App>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

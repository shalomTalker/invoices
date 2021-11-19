import Amplify from 'aws-amplify';
import config from './aws-exports';

import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from './pages/Home';
import { Provider as OrderProvider } from './context/OrderContext'
import Orders from './pages/Orders';


Amplify.configure(config);

const theme = createTheme();



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OrderProvider>
        <BrowserRouter>
          <App>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </App>
        </BrowserRouter>
      </OrderProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

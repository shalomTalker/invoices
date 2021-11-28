import Amplify from 'aws-amplify';
import config from './aws-exports';

import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Review from './pages/Review';
import Order from './pages/Orders/Order';

import { Provider as FormProvider } from './context/formContext';
import { Provider as OrdersProvider } from './context/ordersContext';
import { Provider as ItemsProvider } from './context/itemsContext';

Amplify.configure(config);

// export const getAmlifyUserData = async () => Amplify.Auth.currentUserInfo();
// export const signout = async () => Amplify.Auth.signOut();

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FormProvider>
        <OrdersProvider>
          <ItemsProvider>
            <BrowserRouter>
              <App>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/review' element={<Review />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/orders/:orderId' element={<Order />} />
                </Routes>
              </App>
            </BrowserRouter>
          </ItemsProvider>
        </OrdersProvider>
      </FormProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState, useEffect } from 'react';
import { useOrdersContext } from '../../context/ordersContext';
import { getAllOrders } from '../../logic/api';
import OrdersTable from './OrdersTable';
import { CircularProgress, Box, Typography } from '@mui/material';
// import { API } from "aws-amplify";

function Orders() {
  const { state } = useOrdersContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>{`הזמנות`}</h1>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{Boolean(state.loading) ? <CircularProgress /> : Boolean(state.orders.length) ? <OrdersTable orders={state.orders} /> : <Typography variant='h6'>{`לא קיימות הזמנות`}</Typography>}</div>
    </div>
  );
}

export default Orders;

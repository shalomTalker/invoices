import React, { useState, useEffect, useContext } from 'react';
import { Context as OrdersContext } from '../../context/ordersContext';
import { getAllOrders } from '../../logic/api';
import OrdersTable from './OrdersTable';
import { CircularProgress, Box, Typography } from '@mui/material';
import SearchForm from '../../components/SearchForm';
// import { API } from "aws-amplify";

function Orders() {
  const [results, setResults] = useState([]);

  const { state, fetchOrders } = useContext(OrdersContext);

  useEffect(() => {
    let cancel = false;
    if (!cancel) {
      fetchOrders();
    }
    return () => {
      cancel = true;
    };
  }, []);

  const mapResults = (results) => {
    setResults(
      results.map(({ fullName, address, phone, ...rest }) => ({
        user: { fullName, address, phone },
        ...rest,
      })),
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>{`הזמנות`}</h1>
      <SearchForm
        returnDefaultItems
        setResults={mapResults}
        placeholder={`חיפוש הזמנה`}
        items={state.orders.map(({ orderId, user, ...rest }) => ({
          id: orderId,
          address: user.address,
          phone: user.phone,
          fullName: user.fullName,
          orderId,
          ...rest,
        }))}
        fields={['fullName', 'address', 'phone']}
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Boolean(state.loading) ? (
          <Box style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
            <Typography style={{ marginTop: 50, fontSize: 40 }}> ... טוען הזמנות </Typography>
          </Box>
        ) : Boolean(results.length) ? (
          <OrdersTable orders={results} />
        ) : (
          <Typography variant='h6'>{`לא קיימות הזמנות`}</Typography>
        )}
      </div>
    </div>
  );
}

export default Orders;

import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Context as OrdersContext } from '../../context/ordersContext';
import { Context as ItemsContext } from '../../context/itemsContext';
import useCurrentUser from '../../hooks/useCurrentUser';
import AddItemForm from '../../components/AddItemForm';

export default function AddItemPage() {

  const {
    state: { orders },
    fetchOrders,
  } = useContext(OrdersContext);

  const {
    state: { items },
    fetchItems,
  } = useContext(ItemsContext);

  // const currentUserEmail = useCurrentUser();

  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, []);

  return (
    <div>
      <section>
      <AddItemForm/>
      </section>
    </div>
  );
}

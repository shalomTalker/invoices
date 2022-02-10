import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// import { useUserFormContext } from '../../context/userFormContext';
import { useOrdersContext } from '../../context/ordersContext';
import { useItemsContext } from '../../context/itemsContext';
import useCurrentUser from '../../hooks/useCurrentUser';
import AddItemForm from '../../components/AddItemForm';

export default function AddItemPage() {
  // const { state: orderState } = useUserFormContext();

  const {
    state: { orders },
    fetchOrders,
  } = useOrdersContext();

  const {
    state: { items },
    fetchItems,
  } = useItemsContext();

  const currentUserEmail = useCurrentUser();

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

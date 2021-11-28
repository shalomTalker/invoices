import { useContext } from 'react';
import { getAllOrders, postOrder } from '../logic/api';
import createDataContext from './createDataContext';
import { fetchLocalResource, saveLocalResource } from './utils';

const initialState = {
  orders: [],
  loading: false,
};

const ordersReducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case 'FETCHING_ORDERS':
      saveLocalResource('orders', payload);
      return { orders: payload, loading: false };

    case 'POSTING_NEW_ORDER':
      saveLocalResource('orders', [...state.orders, payload]);
      return { orders: [...state.orders, payload], loading: false };

    case 'LOADING_START':
      return { ...state, loading: true };

    default:
      return initialState;
  }
};

const fetchOrders = (dispatch) => async () => {
  try {
    dispatch({ type: 'LOADING_START' });
    let payload;

    const localData = fetchLocalResource('orders');
    if (localData && localData.length) {
      payload = localData;
    } else {
      const response = await getAllOrders();
      payload = response.data;
    }
    dispatch({ type: 'FETCHING_ORDERS', payload });
  } catch (error) {
    console.error(error);
  }
};
const addOrder = (dispatch) => async (orderObj) => {
  try {
    dispatch({ type: 'LOADING_START' });
    const response = await postOrder(orderObj);

    dispatch({ type: 'POSTING_NEW_ORDER', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const { Provider, Context } = createDataContext(ordersReducer, { fetchOrders, addOrder }, initialState);
export function useOrdersContext() {
  return useContext(Context);
}

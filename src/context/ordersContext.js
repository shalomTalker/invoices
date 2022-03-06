import { useContext } from 'react';
import { getAllOrders, postOrder } from '../logic/api';
import createDataContext from './createDataContext';

const initialState = {
  orders: [],
  loading: false,
};

const ordersReducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case 'FETCHING_ORDERS':
      return { orders: payload, loading: false };

    case 'POSTING_NEW_ORDER':
      return { orders: [...state.orders, payload], loading: false };

    case 'LOADING_START':
      return { ...state, loading: true };

    case 'CLEANING_ORDERS':
      return initialState;

    default:
      return initialState;
  }
};

const fetchOrders = (dispatch) => async () => {
  try {
    dispatch({ type: 'LOADING_START' });
    let payload;

    const response = await getAllOrders();
    payload = response.data;
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

const cleanLocalOrders = (dispatch) => () => {
  dispatch({ type: 'CLEANING_ORDERS' });
};

export const { Provider, Context } = createDataContext(ordersReducer, { fetchOrders, addOrder, cleanLocalOrders }, initialState);
// export function useOrdersContext() {
//   return useContext(Context);
// }

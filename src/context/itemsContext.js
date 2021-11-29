import axios from 'axios';
import { useContext } from 'react';
import { getAllItems, updateItemPrice } from '../logic/api';
import createDataContext from './createDataContext';
import { fetchLocalResource, removeLocalResource, saveLocalResource } from './utils';

const initialState = {
  items: [],
  loading: false,
};

const itemsReducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case 'FETCHING_ITEMS':
      saveLocalResource('items', payload);
      return { items: payload, loading: false };

    case 'LOADING_START':
      return { ...state, loading: true };

    case 'CHANGING_PRICES':
      const newItemIds = payload.map(({ id }) => id);
      const newItems = [...state.items.filter((item) => !newItemIds.includes(item.id)), ...payload];

      saveLocalResource('items', newItems);
      return { ...state, loading: false, items: newItems };

    case 'CLEANING_ITEMS':
      removeLocalResource('items');
      return initialState;
    default:
      return initialState;
  }
};

const fetchItems = (dispatch) => async () => {
  try {
    dispatch({ type: 'LOADING_START' });
    let payload;

    const localData = fetchLocalResource('items');
    if (localData && localData.length) {
      payload = localData;
    } else {
      const response = await getAllItems();
      payload = response.data;
    }
    dispatch({ type: 'FETCHING_ITEMS', payload });
  } catch (error) {
    console.error(error);
  }
};

const updateChanges = (dispatch) => async (changes) => {
  try {
    dispatch({ type: 'LOADING_START' });

    const results = await Promise.all(changes.map(({ id, newPrice }) => updateItemPrice({ id, price: newPrice })));
    dispatch({ type: 'CHANGING_PRICES', payload: results.map((r) => r.data) });
  } catch (error) {
    console.error(error);
  }
};

const cleanLocalItems = (dispatch) => () => {
  dispatch({ type: 'CLEANING_ITEMS' });
};

export const { Provider, Context } = createDataContext(itemsReducer, { fetchItems, updateChanges, cleanLocalItems }, initialState);
export function useItemsContext() {
  return useContext(Context);
}

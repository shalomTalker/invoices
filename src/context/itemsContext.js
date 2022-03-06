import axios from 'axios';
import { useContext } from 'react';
import { getAllItems, updateItemPrice, postItem } from '../logic/api';
import createDataContext from './createDataContext';

const initialState = {
  items: [],
  loading: false,
};

const itemsReducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case 'FETCHING_ITEMS':
      return { items: payload, loading: false };

    case 'LOADING_START':
      return { ...state, loading: true };

    case 'CHANGING_PRICES':
      const newItemIds = payload.map(({ id }) => id);
      const newItems = [...state.items.filter((item) => !newItemIds.includes(item.id)), ...payload];

      return { ...state, loading: false, items: newItems };
    case 'ITEM_CREATED':
      return {...state,loading:false,items:[...state.items,payload]}

    case 'CLEANING_ITEMS':
      return initialState;
    default:
      return initialState;
  }
};

const fetchItems = (dispatch) => async () => {
  try {
    dispatch({ type: 'LOADING_START' });
    let payload;

    const response = await getAllItems();
    payload = response.data;
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

const createItem = (dispatch) => async (itemObj) => {
  try {
    dispatch({ type: 'LOADING_START' });
    const response = await postItem(itemObj);
    console.log(response)

    dispatch({ type: 'ITEM_CREATED',payload:response.data });
  } catch (error) {
    console.log(error)
  }
};

export const { Provider, Context } = createDataContext(
  itemsReducer,
  {
    fetchItems,
    updateChanges,
    cleanLocalItems,
    createItem,
  },
  initialState,
);
// export function useItemsContext() {
//   return useContext(Context);
// }

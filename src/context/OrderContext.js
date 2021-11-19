import { useContext } from 'react';
import createDataContext from './createDataContext';

const initialState = {
  user: {
    fullName: '',
    phone: '',
    email: '',
  },
  items: {}
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADDING_ITEM':
      return {
        ...state,
        items: { ...state.items, [payload.id]: payload }
      }
    case 'REMOVING_ITEM':
      delete state.items[payload.id]

      return {
        ...state,
        items: state.items
      }

    case 'UPDATING_ITEM':

      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload
        }
      }
    case 'UPDATING_USER':
      return {
        ...state,
        user: payload
      }

    default:
      return initialState;
  }
};

const addItem = dispatch => (itemObj) => {
  dispatch({ type: 'ADDING_ITEM', payload: itemObj })
}
const removeItem = dispatch => (itemObj) => {
  dispatch({ type: 'REMOVING_ITEM', payload: itemObj })
}

const updateItem = dispatch => (item, value) => {
  dispatch({
    type: 'UPDATING_ITEM', payload: {
      ...item,
      count: value
    }
  })
}
const updateUser = dispatch => (userObj) => {
  dispatch({ type: 'UPDATING_USER', payload: userObj })
}


export const { Provider, Context } = createDataContext(
  orderReducer,
  {
    addItem,
    removeItem,
    updateItem,
    updateUser
  },
  initialState,
);
export function useOrderContext() { return useContext(Context) }



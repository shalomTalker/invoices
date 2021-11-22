import { useContext } from 'react';
import createDataContext from './createDataContext';

const initialState = {
  user: {
    fullName: '',
    phone: '',
    email: '',
  },
  items: {},
  url: '',
};

const formReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADDING_ITEM':
      return {
        ...state,
        items: { ...state.items, [payload.id]: payload },
      };
    case 'REMOVING_ITEM':
      delete state.items[payload.id];

      return {
        ...state,
        items: state.items,
      };

    case 'UPDATING_ITEM':
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload,
        },
      };
    case 'UPDATING_USER':
      return {
        ...state,
        user: payload,
      };
    case 'RECIEVING_URL':
      return {
        ...state,
        url: payload,
      };
    case 'CLEANING_FORM':
    default:
      return initialState;
  }
};

const addItem = (dispatch) => (itemObj) => {
  dispatch({ type: 'ADDING_ITEM', payload: itemObj });
};
const removeItem = (dispatch) => (itemObj) => {
  dispatch({ type: 'REMOVING_ITEM', payload: itemObj });
};

const updateItem = (dispatch) => (updatedItem) => {
  dispatch({
    type: 'UPDATING_ITEM',
    payload: updatedItem,
  });
};
const updateUser = (dispatch) => (userObj) => {
  dispatch({ type: 'UPDATING_USER', payload: userObj });
};

const setUrl = (dispatch) => (url) => {
  dispatch({ type: 'RECIEVING_URL', payload: url });
};

const cleanForm = (dispatch) => () => {
  dispatch({ type: 'CLEANING_FORM' });
};

export const { Provider, Context } = createDataContext(
  formReducer,
  {
    addItem,
    removeItem,
    updateItem,
    updateUser,
    cleanForm,
    setUrl,
  },
  initialState,
);
export function useFormContext() {
  return useContext(Context);
}

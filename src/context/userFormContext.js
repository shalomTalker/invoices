import { useContext } from 'react';
import { generateRandomId, getCurrentHebDate } from '../utils';
import createDataContext from './createDataContext';

const initialState = {
  user: {
    fullName: '',
    phone: '',
    email: '',
  },
  items: {},
  orderId: generateRandomId(),
  createdAt: getCurrentHebDate(),
};

const reducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });
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

    case 'CLEANING_FORM':
      let orderId = generateRandomId();
      let createdAt = getCurrentHebDate();
      return {
        ...initialState,
        orderId,
        createdAt,
      };

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

const cleanForm = (dispatch) => () => {
  dispatch({ type: 'CLEANING_FORM' });
};

export const { Provider, Context } = createDataContext(
  reducer,
  {
    addItem,
    removeItem,
    updateItem,
    updateUser,
    cleanForm,
  },
  initialState,
);
export function useUserFormContext() {
  return useContext(Context);
}

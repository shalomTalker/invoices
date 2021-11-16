import { useContext } from 'react';
import createDataContext from './createDataContext';

const initialState = {
  token: '',
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {

    default:
      return initialState;
      break;
  }
};


const signin = dispatch => async (data, calllback) => {

  try {
    dispatch({ type: 'SIGNIN', payload: 'token' });
  } catch (error) {
  }
};

const LocalSignin = dispatch => async (token, calllback) => {
  dispatch({ type: 'LOCAL_SIGNIN', payload: token });
};

const signout = dispatch => async (callback) => {
  try {
    dispatch({ type: 'SIGNOUT' });
    callback()
  } catch (error) {
  }
};


export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    LocalSignin,
  },
  initialState,
);
export function useAuth() { return useContext(Context) }



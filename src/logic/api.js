import Auth from '@aws-amplify/auth';
import axios from 'axios';

const API_URI = `http://localhost:5000`;
// const API_URI = `https://p2q0uyrmu0.execute-api.eu-west-1.amazonaws.com`;
console.log(API_URI);

const API = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllItems = async () => {
  return API.get('/items');
};

const getAllOrders = async () => {
  return API.get('/orders');
};

const postOrder = (orderObj) => {
  return API.post('/order', orderObj);
};

const updateItemPrice = (priceChange) => {
  return API.put('/item', priceChange);
};

const postItem = (item) => {
  return API.post('/item', item);
};


export { API, postOrder, getAllOrders, getAllItems, updateItemPrice,postItem };

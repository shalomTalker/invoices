import axios from 'axios';

const API_URI = `http://localhost:5000/local`;
const API_URI = `https://37yn5csprl.execute-api.eu-west-1.amazonaws.com/dev`;

const API = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllItems = () => {
  return API.get('/getItems');
};

const getAllOrders = () => {
  return API.get('/getOrders');
};

const postOrder = (orderObj) => {
  return API.post('/postOrder', orderObj);
};

const updateItemPrice = (priceChange) => {
  return API.put('/updateItemPrice', priceChange);
};

export { API, postOrder, getAllOrders, getAllItems, updateItemPrice };

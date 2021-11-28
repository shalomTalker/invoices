import axios from 'axios';

let baseUri = 'http://localhost:5000';

const API_URI = `${baseUri}/local`;

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

const generateOrderPdf = (orderObj) => {
  return API.post('/generate', orderObj);
};

export { API, postOrder, generateOrderPdf, getAllOrders, getAllItems, updateItemPrice };

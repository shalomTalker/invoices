import axios from 'axios';

let baseUri = 'https://37yn5csprl.execute-api.eu-west-1.amazonaws.com';

const API_URI = `${baseUri}/dev`;

const API = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createOrder = (orderObj) => {
  return API.post('/postOrder', orderObj);
};

const generateOrderPdf = (orderObj) => {
  return API.post('/generate', orderObj);
};

export { API, createOrder, generateOrderPdf };

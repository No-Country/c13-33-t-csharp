import axios from 'axios';

const updateProduct = axios.put({
  baseURL: 'https://homefix.fly.dev/api/articulos',
});

export default updateProduct;

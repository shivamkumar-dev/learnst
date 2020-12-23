import axios from 'axios';
require('dotenv').config();

// Base API Url
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

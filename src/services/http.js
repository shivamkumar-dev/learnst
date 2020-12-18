import axios from 'axios';

// Base API Url
export default axios.create({
  baseURL: 'https://learnst-b.herokuapp.com/api',
});

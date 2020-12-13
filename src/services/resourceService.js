import axios from 'axios';
require('dotenv').config();

export const getResources = () =>
  axios('https://learnst-b.herokuapp.com/api/resources');

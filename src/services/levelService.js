import axios from 'axios';
require('dotenv').config();

export const getLevels = () =>
  axios('https://learnst-b.herokuapp.com/api/levels');

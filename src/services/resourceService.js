import http from './http';

// Get all Resources
export const getResources = () => http.get('/resources');

// Get a Single Resources
export const getResource = (resourceId) => http.get(`/resources/${resourceId}`);

import http from './http';

// Get all Resources
export const getResources = () => http.get('/resources');

// Get a Single Resources
export const getResource = (resourceId) => http.get(`/resources/${resourceId}`);

// Save Resource
export const saveResource = (resource, resourceId) => {
  // Update existing Resource
  if (resource._id) {
    const body = { ...resource };
    delete body._id;
    return http.put(`/resources/${resourceId}`, body);
  }

  // Add new resource
  return http.post('/resources', resource);
};

// Delete Resource
export const deleteResource = (resourceId) => {
  return http.delete(`/resources/${resourceId}`);
};

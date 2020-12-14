import http from './http';

export const getLevels = () => http.get('/levels');

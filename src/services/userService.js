import http from './http';

// Register a new User
export const register = (user) => {
  return http.post('/users', {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

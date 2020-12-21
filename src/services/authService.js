import jwt_decode from 'jwt-decode';
import http from './http';

// User Login Authentication
export const login = async (user) => {
  const { data: jwt } = await http.post('/auth', {
    email: user.email,
    password: user.password,
  });

  localStorage.setItem('token', jwt);
};

// User Login on Registration Using JWT
export const loginWithJwt = (jwt) => {
  localStorage.setItem('token', jwt);
};

// User logout
export const logout = () => {
  localStorage.removeItem('token');
};

// Get Current User
export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem('token');
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
};

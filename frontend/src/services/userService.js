import API from './api';

export const getUsers = () => API.get('/users');
export const getUserByEmail = (email) => API.get(`/users/${email}`);
export const createUser = (data) => API.post('/users', data);
export const updateUser = (email, data) => API.put(`/users/${email}`, data);
export const deleteUser = (email) => API.delete(`/users/${email}`);
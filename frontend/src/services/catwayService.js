import API from './api';

export const getCatways = () => API.get('/catways');
export const getCatwayById = (id) => API.get(`/catways/${id}`);
export const createCatway = (data) => API.post('/catways', data);
export const updateCatwayState = (id, data) => API.put(`/catways/${id}`, data);
export const deleteCatway = (id) => API.delete(`/catways/${id}`);
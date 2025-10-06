import API from './api';

export const getReservationsByCatway = (catwayId) => API.get(`/catways/${catwayId}/reservations`);
export const getReservationById = (catwayId, reservationId) =>
  API.get(`/catways/${catwayId}/reservations/${reservationId}`);
export const createReservation = (catwayId, data) =>
  API.post(`/catways/${catwayId}/reservations`, data);
export const updateReservation = (catwayId, reservationId, data) =>
  API.put(`/catways/${catwayId}/reservations/${reservationId}`, data);
export const deleteReservation = (catwayId, reservationId) =>
  API.delete(`/catways/${catwayId}/reservations/${reservationId}`);
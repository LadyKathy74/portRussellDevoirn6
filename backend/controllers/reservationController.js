const Reservation = require('../models/Reservation');

exports.getReservationsByCatway = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.json(reservations);
};

exports.getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  reservation ? res.json(reservation) : res.status(404).json({ message: 'Reservation not found' });
};

exports.createReservation = async (req, res) => {
  const newReservation = new Reservation({
    ...req.body,
    catwayNumber: req.params.id
  });
  await newReservation.save();
  res.status(201).json(newReservation);
};

exports.updateReservation = async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(req.params.idReservation, req.body, { new: true });
  updated ? res.json(updated) : res.status(404).json({ message: 'Reservation not found' });
};

exports.deleteReservation = async (req, res) => {
  const deleted = await Reservation.findByIdAndDelete(req.params.idReservation);
  deleted ? res.json({ message: 'Reservation deleted' }) : res.status(404).json({ message: 'Reservation not found' });
};
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
};

exports.updateUser = async (req, res) => {
  const updated = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
  updated ? res.json(updated) : res.status(404).json({ message: 'User not found' });
};

exports.deleteUser = async (req, res) => {
  const deleted = await User.findOneAndDelete({ email: req.params.email });
  deleted ? res.json({ message: 'User deleted' }) : res.status(404).json({ message: 'User not found' });
};
const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
};

exports.getCatwayById = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  catway ? res.json(catway) : res.status(404).json({ message: 'Catway not found' });
};

exports.createCatway = async (req, res) => {
  const newCatway = new Catway(req.body);
  await newCatway.save();
  res.status(201).json(newCatway);
};

exports.updateCatwayState = async (req, res) => {
  const updated = await Catway.findOneAndUpdate(
    { catwayNumber: req.params.id },
    { catwayState: req.body.catwayState },
    { new: true }
  );
  updated ? res.json(updated) : res.status(404).json({ message: 'Catway not found' });
};

exports.deleteCatway = async (req, res) => {
  const deleted = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  deleted ? res.json({ message: 'Catway deleted' }) : res.status(404).json({ message: 'Catway not found' });
};
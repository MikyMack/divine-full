const Alumni = require('../models/Alumni');

exports.createAlumni = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;
    const newAlumni = await Alumni.create(req.body,image);
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    res.status(200).json(alumni);
  } catch (err) {
    res.status(404).json({ error: 'Alumni not found' });
  }
};

exports.updateAlumni = async (req, res) => {
  try {
    const image = req.file ? req.file.path : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;
    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedAlumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAlumni = async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

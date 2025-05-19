const Gallery = require('../models/Gallery');

exports.createGallery = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;
    const newGallery = await Gallery.create(req.body,image);
    res.status(201).json(newGallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    res.status(200).json(gallery);
  } catch (err) {
    res.status(404).json({ error: 'Gallery not found' });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const image = req.file ? req.file.path : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;
    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedGallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleGalleryActive = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    gallery.isActive = !gallery.isActive;
    await gallery.save();
    res.status(200).json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

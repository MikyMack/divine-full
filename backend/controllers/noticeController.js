const Notice = require('../models/Notice');

exports.createNotice = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;
    const newNotice = await Notice.create(req.body,image);
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    res.status(200).json(notice);
  } catch (err) {
    res.status(404).json({ error: 'Notice not found' });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const image = req.file ? req.file.path : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;
    const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedNotice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleNoticeActive = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    notice.isActive = !notice.isActive;
    await notice.save();
    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

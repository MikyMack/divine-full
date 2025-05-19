const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Academic = require('../models/Academic');
const Event = require('../models/Event');
const Banner = require('../models/Banner');
const { isAuthenticated } = require('../middleware/auth');
const galleryRoutes = require('./galleryRoutes');
const authController = require("../controllers/authController")




router.use('/gallery', galleryRoutes);
// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Submit
router.post('/login', authController.login);

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Dashboard (Protected)
router.get('/admin-dashboard',isAuthenticated, (req, res) => {
  res.render('admin-dashboard');
});
router.get('/admin-academics', isAuthenticated, async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    let query = {};
    
    if (searchTerm) {
      query = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { subjects: { $regex: searchTerm, $options: 'i' } }
        ]
      };
    }

    const academics = await Academic.find(query).sort({ createdAt: -1 });
    
    res.render('admin-academics', { 
      title: 'Academic Management',
      academics,
      searchTerm,
      error: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin-academics', { 
      error: 'Failed to load academics',
      academics: [],
      searchTerm: ''
    });
  }
});
router.get('/admin-events', isAuthenticated, async (req, res) => {
  try {
      const searchTerm = req.query.search || '';
      let query = {};
      
      if (searchTerm) {
          query = {
              $or: [
                  { title: { $regex: searchTerm, $options: 'i' } },
                  { description: { $regex: searchTerm, $options: 'i' } },
                  { coordinatorName: { $regex: searchTerm, $options: 'i' } },
                  { eventPlace: { $regex: searchTerm, $options: 'i' } }
              ]
          };
      }

      const events = await Event.find(query).sort({ date: -1 });
      
      res.render('admin-events', { 
          title: 'Event Management',
          events,
          searchTerm,
          error: null
      });
  } catch (error) {
      console.error(error);
      res.status(500).render('admin-events', { 
          error: 'Failed to load events',
          events: [],
          searchTerm: ''
      });
  }
});
router.get('/admin-gallery',isAuthenticated, (req, res) => {
  res.render('admin-gallery');
});
router.get('/admin-alumini',isAuthenticated, (req, res) => {
  res.render('admin-alumini');
});
router.get('/admin-notice',isAuthenticated, (req, res) => {
  res.render('admin-notice');
});
router.get('/admin-banner',isAuthenticated, async(req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
        
    res.render('admin-banner', { 
        title: 'Banner Management',
        banners,
        error: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin-banner', { 
        error: 'Failed to load banners',
        banners: []
    });
  }
});

module.exports = router;

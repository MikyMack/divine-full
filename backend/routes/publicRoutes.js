const express = require('express');
const router = express.Router();
const Academic = require('../models/Academic');
const Alumni = require('../models/Alumni');
const Banner = require('../models/Banner');
const Event = require('../models/Event');
const Gallery = require('../models/Gallery');
const Notice = require('../models/Notice');




router.get('/', async (req, res) => {
    try {
        const [banners, events, galleries, notices, academics, alumni] = await Promise.all([
            Banner.find({ isActive: true }).sort({ createdAt: -1 }),
            Event.find({ isActive: true }).sort({ createdAt: -1 }),
            Gallery.find({ isActive: true }).sort({ createdAt: -1 }),
            Notice.find({ isActive: true }).sort({ createdAt: -1 }),
            Academic.find().sort({ createdAt: -1 }),
            Alumni.find().sort({ date: -1 })
        ]);

        res.render('home', {
            title: 'Home',
            banners,
            events,
            galleries,
            notices,
            academics,
            alumni
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading home page data');
    }
});
router.get('/about', async (req, res) => {
    try {
        res.render('about', { title: 'About us'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading about page data');
    }
});
router.get('/events', async (req, res) => {
    try {
       
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6; 

        const skip = (page - 1) * limit;

        const totalEvents = await Event.countDocuments({ isActive: true });

        const events = await Event.find({ isActive: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalEvents / limit);

        res.render('event', {
            title: 'Event',
            events,
            currentPage: page,
            totalPages
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading event page data');
    }
});

router.get('/notices', async (req, res) => {
    try {
        const notices =await Notice.find({ isActive: true }).sort({ createdAt: -1 });
        res.render('notice', { title: 'Notices',notices});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading notice page data');
    }
});

router.get('/alumini', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page, default 1
        const limit = 6; // Items per page
        const skip = (page - 1) * limit;

        const totalAlumini = await Alumni.countDocuments(); // Total items
        const totalPages = Math.ceil(totalAlumini / limit);

        const alumini = await Alumni.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        res.render('alumini', {
            title: 'Alumni',
            alumini,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading alumni page data');
    }
});


router.get('/gallery', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;        // Current page number, default 1
      const limit = 10;                                   // Number of items per page
      const skip = (page - 1) * limit;
  
      // Fetch total count of active gallery items
      const totalCount = await Gallery.countDocuments({ isActive: true });
  
      // Fetch paginated gallery items
      const gallery = await Gallery.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);
  
      res.render('gallery', {
        title: 'Gallery',
        gallery,
        currentPage: page,
        totalPages
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading gallery page data');
    }
  });
  
router.get('/academics', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page
      const limit = 6; // Items per page
  
      const total = await Academic.countDocuments();
      const totalPages = Math.ceil(total / limit);
      const skip = (page - 1) * limit;
  
      const academics = await Academic.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      res.render('academics', {
        title: 'Academics',
        academics,
        currentPage: page,
        totalPages
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading academics page data');
    }
  });
  
router.get('/academicsDetails/:id', async (req, res) => {
    try {
      const academic = await Academic.findById(req.params.id);
  
      if (!academic) {
        return res.status(404).send('Academic record not found');
      }
  
      res.render('academicDetails', {
        title: academic.title || 'Academic Details',
        academic
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading academic details');
    }
  });
  
router.get('/contact', async (req, res) => {
    try {
        res.render('contact', { title: 'contact us'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading contact page data');
    }
});


module.exports = router;
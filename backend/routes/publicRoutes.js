const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
    try {
        res.render('home', { title: 'home'});
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
        res.render('event', { title: 'Event'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading event page data');
    }
});
router.get('/alumini', async (req, res) => {
    try {
        res.render('alumini', { title: 'Alumni'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading alumni page data');
    }
});
router.get('/gallery', async (req, res) => {
    try {
        res.render('gallery', { title: 'Gallery'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading gallery page data');
    }
});
router.get('/academics', async (req, res) => {
    try {
        res.render('academics', { title: 'Academics'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading academics page data');
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
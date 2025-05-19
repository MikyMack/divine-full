// controllers/authController.js
const User = require('../models/Admin'); 

exports.login = async (req, res) => {
    
    const { email, password } = req.body;
    
    if (email === 'admin@divine.com' && password === 'admin@admin') {
        req.session.user = { email };
        res.redirect('/admin/admin-dashboard');
    } else {
        res.render('login', { title: 'Admin Login', error: 'Invalid email or password' });
    }
};


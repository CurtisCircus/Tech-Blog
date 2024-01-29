const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

// Homepage route
router.get('/', blogController.getHomePage);

// Dashboard route
router.get('/dashboard', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }

  // Render the dashboard template
  res.render('dashboard');
});

// Logout route
router.get('/logout', authController.logout);

// Sign-up routes
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/comments/create', blogController.postComment);

router.get('/dashboard', blogController.getDashboard);

module.exports = router;

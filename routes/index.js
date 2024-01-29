const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

// Homepage route
router.get('/', blogController.getHomePage);

// Sign-up route
router.get('/signup', authController.getSignup);

// Sign-in route
router.get('/login', authController.getLogin);

module.exports = router;

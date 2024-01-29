const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Homepage route
router.get('/', blogController.getHomePage);

// Logout route
router.get('/logout', authController.logout);

// Sign-up routes
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Comment route
router.post('/comments/create', blogController.postComment);

// Route to display the form for creating a new blog post
router.get('/create', authController.requireAuth, blogController.getCreatePost);

// Route to handle the submission of the new blog post form
router.post('/create', authController.requireAuth, blogController.postCreatePost);

module.exports = router;
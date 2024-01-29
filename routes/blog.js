const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Dashboard route
router.get('/dashboard', authMiddleware.isAuthenticated, blogController.getDashboard);

// Update blog post form
router.get('/dashboard/update/:id', authController.protect, blogController.getUpdatePost);

// Handle update blog post form submission
router.post('/dashboard/update/:id', authController.protect, blogController.postUpdatePost);

// Handle delete blog post
router.get('/dashboard/delete/:id', authController.protect, blogController.deletePost);

module.exports = router;

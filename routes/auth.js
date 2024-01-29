const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.getLogin);

// Add more authentication routes as needed

module.exports = router;

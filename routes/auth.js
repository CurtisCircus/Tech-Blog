const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.getLogin);

module.exports = router;

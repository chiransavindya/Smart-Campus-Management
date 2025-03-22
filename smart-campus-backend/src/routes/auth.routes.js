const express = require('express');
const { register, login, getMe, validateToken } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.get('/validate', protect, validateToken);

module.exports = router; 
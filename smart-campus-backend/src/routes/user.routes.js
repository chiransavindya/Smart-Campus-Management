const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes below this middleware are protected
router.use(protect);

// Admin-only routes
router.get('/', authorize('admin'), getUsers);
router.delete('/:id', authorize('admin'), deleteUser);

// Routes accessible by owners or admins
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = router; 
const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Placeholder routes for schedule
router.get('/user', protect, (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Introduction to Computer Science',
      startTime: '09:00',
      endTime: '10:30',
      room: '101',
      dayOfWeek: 'monday',
      capacity: 30
    },
    {
      id: '2',
      name: 'Data Structures',
      startTime: '14:00',
      endTime: '15:30',
      room: '102',
      dayOfWeek: 'wednesday',
      capacity: 40
    }
  ]);
});

// More routes will be implemented later
router.get('/:id', protect, (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Sample Class',
    startTime: '09:00',
    endTime: '10:30',
    room: '101',
    dayOfWeek: 'monday',
    capacity: 30
  });
});

module.exports = router; 
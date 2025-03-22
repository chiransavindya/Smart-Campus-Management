const express = require('express');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Placeholder routes for notifications
router.get('/', protect, (req, res) => {
  res.json([
    {
      id: '1',
      title: 'New Event',
      message: 'A new event has been created: Tech Conference',
      type: 'event',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Reservation Approved',
      message: 'Your reservation for Room 101 has been approved',
      type: 'reservation',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);
});

// More routes will be implemented later
router.get('/unread-count', protect, (req, res) => {
  res.json({ count: 1 });
});

router.put('/:id/read', protect, (req, res) => {
  res.json({
    id: req.params.id,
    title: 'New Event',
    message: 'A new event has been created: Tech Conference',
    type: 'event',
    isRead: true,
    createdAt: new Date().toISOString()
  });
});

module.exports = router; 
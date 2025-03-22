const express = require('express');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all resources
router.get('/resources', protect, (req, res) => {
  res.json([
    {
      id: '101',
      name: 'Conference Room A',
      type: 'room',
      location: 'Main Building, 1st Floor',
      capacity: 30,
      amenities: ['Projector', 'Whiteboard', 'Video conferencing']
    },
    {
      id: '102',
      name: 'Lab Room B',
      type: 'room',
      location: 'Science Building, 2nd Floor',
      capacity: 20,
      amenities: ['Computers', 'Specialized equipment']
    },
    {
      id: '103',
      name: 'Auditorium',
      type: 'venue',
      location: 'Arts Building, Ground Floor',
      capacity: 200,
      amenities: ['Stage', 'Sound system', 'Lighting control']
    },
    {
      id: '104',
      name: 'Study Room 1',
      type: 'room',
      location: 'Library, 3rd Floor',
      capacity: 8,
      amenities: ['Whiteboard', 'Quiet space']
    },
    {
      id: '105',
      name: 'Video Equipment Kit',
      type: 'equipment',
      location: 'Media Center',
      capacity: 0,
      amenities: ['Camera', 'Tripod', 'Microphone']
    }
  ]);
});

// Placeholder routes for reservations
router.get('/', protect, (req, res) => {
  res.json([
    {
      id: '1',
      resourceId: '101',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      purpose: 'Study session',
      status: 'approved'
    },
    {
      id: '2',
      resourceId: '102',
      startTime: new Date(Date.now() + 86400000).toISOString(),
      endTime: new Date(Date.now() + 90000000).toISOString(),
      purpose: 'Group project meeting',
      status: 'pending'
    }
  ]);
});

// More routes will be implemented later
router.get('/:id', protect, (req, res) => {
  res.json({
    id: req.params.id,
    resourceId: '101',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    purpose: 'Study session',
    status: 'approved'
  });
});

module.exports = router; 
const express = require('express');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all resources
router.get('/', protect, (req, res) => {
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

// Get resource by ID
router.get('/:id', protect, (req, res) => {
  const resourceId = req.params.id;
  const resources = [
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
  ];
  
  const resource = resources.find(r => r.id === resourceId);
  
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }
  
  res.json(resource);
});

// Get resource availability
router.get('/:id/availability', protect, (req, res) => {
  const { startDate, endDate } = req.query;
  
  // Return mock availability data
  res.json({
    available: true,
    conflicts: []
  });
});

module.exports = router; 
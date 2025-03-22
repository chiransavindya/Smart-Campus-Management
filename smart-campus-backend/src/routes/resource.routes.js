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
  try {
    const resourceId = req.params.id;
    const { startDate, endDate } = req.query;
    
    // Validate required parameters
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Start date and end date are required for availability check' 
      });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate date formats
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ 
        message: 'Invalid date format. Please provide valid ISO date strings.' 
      });
    }
    
    // Check if end is after start
    if (end <= start) {
      return res.status(400).json({ 
        message: 'End date must be after start date' 
      });
    }
    
    // In a real app, you would query database for conflicts here
    console.log(`Checking availability for resource ${resourceId} from ${startDate} to ${endDate}`);
    
    // Simulate availability check (always available for demo)
    res.json({
      resourceId,
      startDate,
      endDate,
      available: true,
      conflicts: []
    });
  } catch (error) {
    console.error(`Error checking resource availability:`, error);
    res.status(500).json({ 
      message: 'Failed to check resource availability', 
      error: error.message 
    });
  }
});

module.exports = router; 
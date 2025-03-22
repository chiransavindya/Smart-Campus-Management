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

// Get user's reservations
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

// Get reservation by ID
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

// Create reservation
router.post('/', protect, (req, res) => {
  try {
    const { resourceId, startTime, endTime, purpose } = req.body;
    
    // Validate required fields
    if (!resourceId) {
      return res.status(400).json({ message: 'Resource ID is required' });
    }
    
    if (!startTime) {
      return res.status(400).json({ message: 'Start time is required' });
    }
    
    if (!endTime) {
      return res.status(400).json({ message: 'End time is required' });
    }
    
    if (!purpose) {
      return res.status(400).json({ message: 'Purpose is required' });
    }
    
    // Check if end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }
    
    // In a real app, you would save to database here
    console.log('Creating reservation:', req.body);
    
    // Return created reservation with mock ID
    res.status(201).json({
      id: Date.now().toString(),
      resourceId,
      startTime,
      endTime,
      purpose,
      status: 'pending',
      user: req.user._id // This would be set by the auth middleware
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
});

// Update reservation
router.put('/:id', protect, (req, res) => {
  try {
    const { resourceId, startTime, endTime, purpose } = req.body;
    const reservationId = req.params.id;
    
    // Validate required fields
    if (!resourceId) {
      return res.status(400).json({ message: 'Resource ID is required' });
    }
    
    if (!startTime) {
      return res.status(400).json({ message: 'Start time is required' });
    }
    
    if (!endTime) {
      return res.status(400).json({ message: 'End time is required' });
    }
    
    if (!purpose) {
      return res.status(400).json({ message: 'Purpose is required' });
    }
    
    // Check if end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }
    
    // In a real app, you would update in the database here
    console.log(`Updating reservation ${reservationId}:`, req.body);
    
    // Return updated reservation
    res.json({
      id: reservationId,
      resourceId,
      startTime,
      endTime,
      purpose,
      status: 'pending',
      user: req.user._id // This would be set by the auth middleware
    });
  } catch (error) {
    console.error(`Error updating reservation ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update reservation', error: error.message });
  }
});

// Cancel/delete reservation
router.delete('/:id', protect, (req, res) => {
  try {
    const reservationId = req.params.id;
    
    // In a real app, you would delete from database here
    console.log(`Deleting reservation ${reservationId}`);
    
    // Return success message
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    console.error(`Error deleting reservation ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to cancel reservation', error: error.message });
  }
});

// Check for reservation conflicts
router.post('/check-conflicts', protect, (req, res) => {
  try {
    const { resourceId, startTime, endTime } = req.body;
    
    // In a real app, you would check database for conflicts
    console.log('Checking conflicts for:', { resourceId, startTime, endTime });
    
    // Return mock conflict check result (no conflicts)
    res.json({
      hasConflicts: false,
      conflicts: []
    });
  } catch (error) {
    console.error('Error checking for conflicts:', error);
    res.status(500).json({ message: 'Failed to check for conflicts', error: error.message });
  }
});

module.exports = router; 
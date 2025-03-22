const Event = require('../models/event.model');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees.user', 'name email');

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
  try {
    const newEvent = {
      ...req.body,
      organizer: req.user._id,
    };

    const event = await Event.create(newEvent);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Organizer or Admin
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    // Check if user is authorized to update
    if (
      req.user.role !== 'admin' &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to update this event',
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Organizer or Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    // Check if user is authorized to delete
    if (
      req.user.role !== 'admin' &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to delete this event',
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    // Check if user is already registered
    if (
      event.attendees.some(
        (attendee) => attendee.user.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json({
        message: 'Already registered for this event',
      });
    }

    // Check if event has capacity limit and is already full
    if (event.capacity > 0 && event.attendees.length >= event.capacity) {
      return res.status(400).json({
        message: 'Event is at full capacity',
      });
    }

    event.attendees.push({
      user: req.user._id,
      status: 'registered',
    });

    await event.save();

    res.status(200).json({
      message: 'Successfully registered for the event',
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Cancel event registration
// @route   DELETE /api/events/:id/register
// @access  Private
exports.cancelEventRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    // Check if user is registered
    if (
      !event.attendees.some(
        (attendee) => attendee.user.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json({
        message: 'Not registered for this event',
      });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(
      (attendee) => attendee.user.toString() !== req.user._id.toString()
    );

    await event.save();

    res.status(200).json({
      message: 'Successfully canceled event registration',
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}; 
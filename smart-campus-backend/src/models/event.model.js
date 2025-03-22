const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    type: {
      type: String,
      enum: ['academic', 'social', 'sports', 'other'],
      default: 'academic',
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['registered', 'attended', 'absent'],
          default: 'registered',
        },
      },
    ],
    capacity: {
      type: Number,
      default: 0, // 0 means unlimited
    },
    image: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if event is past
eventSchema.virtual('isPast').get(function () {
  return new Date(this.endDate) < new Date();
});

// Virtual to count registered attendees
eventSchema.virtual('registeredCount').get(function () {
  return this.attendees.length;
});

// Index for faster querying by date
eventSchema.index({ startDate: 1, endDate: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 
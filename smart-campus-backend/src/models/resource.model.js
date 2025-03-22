const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['room', 'equipment', 'venue', 'other'],
      required: [true, 'Resource type is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      default: 0, // 0 means not applicable
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      monday: {
        start: { type: String, default: '08:00' },
        end: { type: String, default: '18:00' },
        available: { type: Boolean, default: true }
      },
      tuesday: {
        start: { type: String, default: '08:00' },
        end: { type: String, default: '18:00' },
        available: { type: Boolean, default: true }
      },
      wednesday: {
        start: { type: String, default: '08:00' },
        end: { type: String, default: '18:00' },
        available: { type: Boolean, default: true }
      },
      thursday: {
        start: { type: String, default: '08:00' },
        end: { type: String, default: '18:00' },
        available: { type: Boolean, default: true }
      },
      friday: {
        start: { type: String, default: '08:00' },
        end: { type: String, default: '18:00' },
        available: { type: Boolean, default: true }
      },
      saturday: {
        start: { type: String, default: '09:00' },
        end: { type: String, default: '15:00' },
        available: { type: Boolean, default: false }
      },
      sunday: {
        start: { type: String, default: '09:00' },
        end: { type: String, default: '15:00' },
        available: { type: Boolean, default: false }
      },
    },
    needsApproval: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying
resourceSchema.index({ type: 1, isActive: 1 });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource; 
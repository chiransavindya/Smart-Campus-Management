const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    room: {
      type: String,
      required: [true, 'Room is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
    },
    dayOfWeek: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: [true, 'Day of week is required'],
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        students: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            status: {
              type: String,
              enum: ['present', 'absent', 'late'],
              default: 'absent',
            },
          },
        ],
      },
    ],
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if class is full
scheduleSchema.virtual('isFull').get(function () {
  return this.students.length >= this.capacity;
});

// Virtual to count enrolled students
scheduleSchema.virtual('enrolledCount').get(function () {
  return this.students.length;
});

// Index for faster querying
scheduleSchema.index({ dayOfWeek: 1, startTime: 1, endTime: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule; 
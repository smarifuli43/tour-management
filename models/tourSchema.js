const mongoose = require('mongoose');

// schema of tour
const tourSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A tour must have a title'],
      trim: true,
      minLength: [5, 'A tour title must have more or equal then 5 characters'],
      maxLength: [
        100,
        'A tour title must have less or equal then 40 characters',
      ],
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
      min: [0, 'price cannot be negative'],
    },
    place: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      required: [true, 'A tour must have a rating'],
    },
    status: {
      type: String,
      enum: {
        values: ['available', 'booked'],
        message: "Status can't be {VALUE}",
      },
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
      min: [0, 'duration cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

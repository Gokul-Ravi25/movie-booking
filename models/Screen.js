const mongoose = require('mongoose');

// Screen Schema
const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide screen name'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please provide screen image']
  },
  city: {
    type: String,
    required: [true, 'Please provide screen city'],
    trim: true
  },
  ticketPrice: {
    type: Number,
    required: [true, 'Please provide ticket price']
  },
  seats: {
    row0: {
      type: Array
    },
    row1: {
      type: Array
    },
    row2: {
      type: Array
    },
    row3: {
      type: Array
    },
    row4: {
      type: Array
    },
    row5: {
      type: Array
    },
    row6: {
      type: Array
    },
    row7: {
      type: Array
    },
    row8: {
      type: Array
    },
    row9: {
      type: Array
    },
    row10: {
      type: Array
    },
    row11: {
      type: Array
    },
    row12: {
      type: Array
    },
    row13: {
      type: Array
    },
    row14: {
      type: Array
    },
    row15: {
      type: Array
    },
    row16: {
      type: Array
    },
    row17: {
      type: Array
    },
    row18: {
      type: Array
    },
    row19: {
      type: Array
    },
    row20: {
      type: Array
    },
    row21: {
      type: Array
    },
    row22: {
      type: Array
    },
    row23: {
      type: Array
    },
    row24: {
      type: Array
    }
  }
});

// Screen model
module.exports = mongoose.model('Screen', screenSchema);

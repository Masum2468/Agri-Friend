const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number, // in acres
    required: true
  },
  soilType: {
    type: String,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peat', 'Chalky'],
    default: 'Loamy'
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Farm', FarmSchema);

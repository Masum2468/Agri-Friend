const mongoose = require('mongoose');

const HarvestSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true, // e.g. kg, tons, bags
    trim: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  quality: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Harvest', HarvestSchema);

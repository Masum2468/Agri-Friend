const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  variety: {
    type: String,
    required: true,
    trim: true
  },
  plantingDate: {
    type: Date,
    required: true
  },
  expectedHarvestDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Planted', 'Growing', 'Harvested', 'Failed'],
    default: 'Planted'
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

module.exports = mongoose.model('Crop', CropSchema);

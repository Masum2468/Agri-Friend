const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  harvestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Harvest',
    required: true
  },
  buyerName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  revenue: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Sale', SaleSchema);

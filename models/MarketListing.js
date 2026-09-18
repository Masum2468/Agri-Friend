const mongoose = require('mongoose');

const MarketListingSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  itemType: {
    type: String,
    enum: ['Equipment', 'Seed', 'Crop', 'Service'],
    required: true
  },
  dealType: {
    type: String,
    enum: ['Sale', 'Rent', 'Share'],
    default: 'Sale'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MarketListing', MarketListingSchema);

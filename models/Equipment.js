const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true, // e.g. Tractor, Harvester, Seeder, Irrigation
    trim: true
  },
  status: {
    type: String,
    enum: ['Available', 'In Use', 'Maintenance', 'Sold', 'Rented'],
    default: 'Available'
  },
  purchaseDate: {
    type: Date
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

module.exports = mongoose.model('Equipment', EquipmentSchema);

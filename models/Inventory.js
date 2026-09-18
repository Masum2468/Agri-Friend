const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
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
    enum: ['Seed', 'Fertilizer', 'Pesticide', 'Other'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true, // e.g. kg, L, bags, packets
    trim: true
  },
  minThreshold: {
    type: Number,
    default: 10, // Alert threshold for low inventory
    min: 0
  },
  notes: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

InventorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Inventory', InventorySchema);

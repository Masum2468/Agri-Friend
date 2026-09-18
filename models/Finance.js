const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  category: {
    type: String,
    enum: ['Seeds', 'Fertilizer', 'Pesticide', 'Labor', 'Equipment Purchase', 'Equipment Rent', 'Crop Sale', 'Other'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Finance', FinanceSchema);

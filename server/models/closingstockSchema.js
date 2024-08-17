const mongoose = require('mongoose');

const closingStockSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  items: [
    {
      item: String,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('ClosingStock', closingStockSchema);

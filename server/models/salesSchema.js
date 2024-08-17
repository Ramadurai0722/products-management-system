const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Sales', salesSchema);

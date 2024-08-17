// models/purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  items: [{
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Purchase', purchaseSchema);

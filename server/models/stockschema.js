const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  date: Date,
  items: {
    elluUlunthuIdlyPodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    paruppuRicePodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    karuveppillaiIdlyPodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    PoonduRicePodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    murungaiKeeraiRicePodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    ChillyIdlyPodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    PudinaIdlyPodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
    AndhraParuppuPodi: {
      openingStock: Number,
      purchase: Number,
      sales: Number,
      closingStock: Number,
      shortage: Number,
    },
  },
});

const StockTransaction = mongoose.model('StockTransaction', stockTransactionSchema);

module.exports = StockTransaction;

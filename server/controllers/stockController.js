const StockTransaction = require('../models/stockschema');

exports.getAllTransactions = async (req, res) => {
  try {
    const stockTransactions = await StockTransaction.find({});
    res.json(stockTransactions);
  } catch (error) {
    console.error('Error fetching stock transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

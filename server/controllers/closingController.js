// closingStockController.js
const ClosingStock = require('../models/closingstockSchema');

exports.addClosingStock = async (req, res) => {
  try {
    const { date, items } = req.body;
    for (const item of items) {
      const existingStock = await ClosingStock.findOne({ date, 'items.item': item.item });
      if (existingStock) {
        const existingItem = existingStock.items.find((i) => i.item === item.item);
        existingItem.quantity += item.quantity;
        await existingStock.save();
      } else {
        await ClosingStock.create({ date, items: [item] });
      }
    }
    res.status(200).json({ message: 'Closing stock added successfully' });
  } catch (error) {
    console.error('Error adding closing stock data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFilteredClosingStock = async (req, res) => {
  try {
    const { date, toDate, itemName } = req.query;

    let query = {
      date: { $gte: new Date(date) }, 
    };

    if (toDate) {
      query.date.$lte = new Date(toDate);
    }

    if (itemName) {
      query['items'] = {
        $elemMatch: { 'item': { $in: itemName.split(',') } }
      };
    }
    
    const data = await ClosingStock.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching filtered closing stock data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

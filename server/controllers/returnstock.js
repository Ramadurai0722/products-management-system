// returnStockController.js
const Return = require('../models/returnSchema');

exports.addReturn = async (req, res) => {
  try {
    const { date, items } = req.body;
    for (const item of items) {
      const existingReturn = await Return.findOne({ date, 'items.item': item.item });
      if (existingReturn) {
        const existingItem = existingReturn.items.find((i) => i.item === item.item);
        existingItem.quantity += item.quantity;
        await existingReturn.save();
      } else {
        await Return.create({ date, items: [item] });
      }
    }
    res.status(200).json({ message: 'Return added successfully' });
  } catch (error) {
    console.error('Error adding return data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFilteredReturnData = async (req, res) => {
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
    
    const data = await Return.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching filtered return data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

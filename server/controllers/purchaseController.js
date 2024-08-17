// purchaseController.js
const Purchase = require('../models/purchaseSchema');

exports.addPurchase = async (req, res) => {
  try {
    const { date, items } = req.body;
    for (const item of items) {
      const existingPurchase = await Purchase.findOne({ date, 'items.item': item.item });

      if (existingPurchase) {
        const existingItem = existingPurchase.items.find((i) => i.item === item.item);
        existingItem.quantity += item.quantity;
        await existingPurchase.save();
      } else {
        await Purchase.create({ date, items: [item] });
      }
    }
    res.status(200).json({ message: 'Purchases added successfully' });
  } catch (error) {
    console.error('Error adding purchase data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getFilteredData = async (req, res) => {
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
    
    const data = await Purchase.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

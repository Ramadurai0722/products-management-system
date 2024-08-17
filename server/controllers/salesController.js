const Sale = require('../models/salesSchema');

exports.addSales = async (req, res) => {
  try {
    const { date, items } = req.body;
    for (const item of items) {
      const existingSale = await Sale.findOne({ date, 'items.item': item.item });
      if (existingSale) {
        const existingItem = existingSale.items.find((i) => i.item === item.item);
        existingItem.quantity += item.quantity;
        await existingSale.save();
      } else {
        await Sale.create({ date, items: [item] });
      }
    }
    res.status(200).json({ message: 'Sales added successfully' });
  } catch (error) {
    console.error('Error adding sales data:', error);
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
    
    const data = await Sale.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching filtered sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

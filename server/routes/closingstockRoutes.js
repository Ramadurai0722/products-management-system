const express = require('express');
const router = express.Router();
const closingStockController = require('../controllers/closingController');

router.post('/add', closingStockController.addClosingStock);
router.get('/filtered-data', closingStockController.getFilteredClosingStock);

module.exports = router;

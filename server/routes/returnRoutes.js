const express = require('express');
const router = express.Router();
const returnStockController = require('../controllers/returnstock');

router.post('/add', returnStockController.addReturn);
router.get('/filtered-data', returnStockController.getFilteredReturnData);

module.exports = router;


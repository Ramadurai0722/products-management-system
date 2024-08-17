const express = require('express');
const router = express.Router();
const stockTransactionController = require('../controllers/stockController');

router.get('/', stockTransactionController.getAllTransactions);

module.exports = router;

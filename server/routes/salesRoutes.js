const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/add', salesController.addSales);
router.get('/filtered-data', salesController.getFilteredData);

module.exports = router;
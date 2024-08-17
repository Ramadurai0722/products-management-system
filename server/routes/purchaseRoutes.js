const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/add', purchaseController.addPurchase);
router.get('/filtered-data', purchaseController.getFilteredData);

module.exports = router;

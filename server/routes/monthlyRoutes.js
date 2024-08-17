const express = require('express');
const router = express.Router();
const monthlyReportController = require('../controllers/monthlyreportCon');

router.get('/:selectedMonth', monthlyReportController.getMonthlyReport);

module.exports = router;

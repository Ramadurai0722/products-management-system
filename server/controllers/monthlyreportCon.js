
const monthlyReportData = {}; 

const getMonthlyReport = (req, res) => {
  const { selectedMonth } = req.params;
  if (!monthlyReportData[selectedMonth]) {
    return res.status(200).json({});
  }
  return res.status(200).json(monthlyReportData[selectedMonth]);
};

module.exports = {
  getMonthlyReport,
};

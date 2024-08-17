import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Datacheck = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [report, setReport] = useState('');
  const [itemData, setItemData] = useState([]);

  const itemList = [
    { name: '01. Ellu Ulunthu Idly Podi' },
    { name: '02. Paruppu Rice Podi' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fromDate && toDate) {
          const purchaseResponse = await axios.get(`http://localhost:3001/purchase/filtered-data`, {
            params: { date: fromDate, toDate: toDate }
          });
          const salesResponse = await axios.get(`http://localhost:3001/sales/filtered-data`, {
            params: { date: fromDate, toDate: toDate }
          });
          const closingStockResponse = await axios.get(`http://localhost:3001/closingstock/filtered-data`, {
            params: { date: fromDate, toDate: toDate }
          });
          const returnResponse = await axios.get(`http://localhost:3001/return/filtered-data`, {
            params: { date: fromDate, toDate: toDate }
          });
          console.log(purchaseResponse);
          const combinedData = itemList.map((item, index) => ({
            ...item,
            purchase: purchaseResponse.data[index]?.quantity || 0,
            sales: salesResponse.data[index]?.quantity || 0,
            closingStock: closingStockResponse.data[index]?.quantity || 0,
            return: returnResponse.data[index]?.quantity || 0
          }));
          
          setItemData(combinedData);

          const generatedReport = `Report generated from ${fromDate} to ${toDate}`;
          setReport(generatedReport);
        } else {
          console.error('Please select valid dates.');
        }
      } catch (error) {
        console.error('Error generating report:', error);
      }
    };
    fetchData();
  }, [fromDate, toDate]);

  return (
    <div>
      <h1>Item Purchases</h1>
      <label htmlFor="fromDate">From Date:</label>
      <input
        type="date"
        id="fromDate"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <label htmlFor="toDate">To Date:</label>
      <input
        type="date"
        id="toDate"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <button onClick={() => {}}>Generate Report</button>
      <div id="report">{report}</div>
      <h2>Item List</h2>
      {itemData.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Purchase: {item.purchase}</p>
          <p>Sales: {item.sales}</p>
          <p>Closing Stock: {item.closingStock}</p>
          <p>Return: {item.return}</p>
        </div>
      ))}
    </div>
  );
};

export default Datacheck;

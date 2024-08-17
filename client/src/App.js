import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Purchase from './components/Purchase';
import LoginForm from './components/login';
import Sales from './components/Sales';
import Closing from './components/closing';
import Purchasedata from './components/purchasedata';
import Saledata from './components/Salesdata';
import ClosingStockData from './components/closingdata';
import DataCheck from './components/datacheck';
import ReturnStock from './components/return';
import ReturnData from './components/returndata';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/closing" element={<Closing />} />
          <Route path="/purchasedata" element={<Purchasedata />} />
          <Route path="/saledata" element={<Saledata />} />
          <Route path="/closingdata" element={<ClosingStockData />} />
          <Route path="/Datacheck" element={<DataCheck />} />
          <Route path="/return" element={<ReturnStock />} />
          <Route path="/returndata" element={<ReturnData />} />
          <Route path="/" element={<Purchase />} />
        </Routes>
      </Router>
  );
};

export default App;

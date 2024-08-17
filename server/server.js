const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Connect to MongoDB
const dbPassword = 'ra11092002hul';
const dbURI = 'mongodb+srv://Admin:' + dbPassword + '@cluster0.zr2isau.mongodb.net/aanandhas-sweets';

mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

// Import and use routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/purchase',purchaseRoutes);

const salesRoutes = require('./routes/salesRoutes');
app.use('/sales',salesRoutes);

const closingStockRoutes= require('./routes/closingstockRoutes');
app.use('/closingstock',closingStockRoutes);

const stockTransactionRouter = require('./routes/stockRoutes');
app.use('/stocktransactions', stockTransactionRouter);

const returnStockRoutes = require('./routes/returnRoutes');
app.use('/return', returnStockRoutes);

const monthlyReportRoutes = require('./routes/monthlyRoutes');
app.use('/monthly-report', monthlyReportRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

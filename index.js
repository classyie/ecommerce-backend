const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db'); // Import the database connection
const authRoutes = require('./routes/auth'); // Import authentication routes
const products = require('./routes/products');
const orders = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/products', products);
app.use('/orders', orders);
// Default route
app.get('/', (req, res) => {
  res.send('Backend For my E-Commerce');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

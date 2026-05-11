// 🚀 Insurance Policy Management System - Backend Server

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

// ======================
// Import Routes
// ======================

const policyRoutes = require('./src/routes/policyRoutes');
const authRoutes = require('./src/routes/authRoutes');

// ======================
// Middleware
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// ======================
// API Routes
// ======================

app.use('/api/auth', authRoutes);

app.use('/api/policies', policyRoutes);

// ======================
// Health Check
// ======================

app.get('/api/health', (req, res) => {

  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Backend running successfully',
    port: PORT
  });

});

// ======================
// Root Route
// ======================

app.get('/', (req, res) => {

  res.json({
    success: true,
    message: 'Insurance Policy Management API'
  });

});

// ======================
// 404 Handler
// ======================

app.use('*', (req, res) => {

  res.status(404).json({
    success: false,
    message: 'Route not found'
  });

});

// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {

  console.error('Global Error:', err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });

});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {

  console.log(
    `🚀 Backend Server running on http://localhost:${PORT}`
  );

  console.log(
    `📊 Health check: http://localhost:${PORT}/api/health`
  );

});
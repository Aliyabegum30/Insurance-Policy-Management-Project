// 📱 Main App Configuration

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ======================
// Middleware
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================
// Initialize Services
// ======================

const policyService = require('./services/PolicyService');

policyService
  .initializeDB()
  .then(() => {

    console.log('✅ Policy DB initialized');

  })
  .catch((err) => {

    console.error('DB Init Error:', err);

  });

// ======================
// Routes
// ======================

const policyRoutes = require('./routes/policyRoutes');

app.use('/api/policies', policyRoutes);

// ======================
// Export App
// ======================

module.exports = app;
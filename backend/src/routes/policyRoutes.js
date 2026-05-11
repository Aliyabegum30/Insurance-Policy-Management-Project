// 🛤️ Policy Routes

const express = require('express')

const router = express.Router()

const policyController = require('../controllers/PolicyController')

// ======================
// PUBLIC ROUTES
// ======================

// GET all policies
router.get(
  '/',
  policyController.getAllPolicies
)

// GET policy stats
router.get(
  '/stats',
  policyController.getStats
)

// SEARCH policies
router.get(
  '/search',
  policyController.searchPolicies
)

// GET single policy
router.get(
  '/:id',
  policyController.getPolicyById
)

// ======================
// CREATE POLICY
// ======================

router.post(
  '/',
  policyController.createPolicy
)

// ======================
// UPDATE POLICY
// ======================

router.put(
  '/:id',
  policyController.updatePolicy
)

// ======================
// DELETE POLICY
// ======================

router.delete(
  '/:id',
  policyController.deletePolicy
)

module.exports = router
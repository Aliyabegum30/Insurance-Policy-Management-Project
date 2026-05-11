// 💼 Policy Service Layer

const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')

const PolicyFactory =
  require('../utils/PolicyFactory')

const InvalidPolicyException =
  require('../models/InvalidPolicyException')

class PolicyService {

  constructor() {

    const adapter =
      new JSONFile('data/db.json')

    this.db = new Low(adapter, {
      policies: []
    })
  }

  // ======================
  // Initialize DB
  // ======================

  async initializeDB() {

    await this.db.read()

    this.db.data ||= {
      policies: []
    }

    await this.db.write()
  }

  // ======================
  // Generate Policy Number
  // ======================

  generatePolicyNumber(type) {

    const prefix =
      type?.substring(0, 3) || 'POL'

    return `${prefix}-${Date.now()}`
  }

  // ======================
  // GET ALL POLICIES
  // ======================

  async getAllPolicies() {

    await this.initializeDB()

    const policies =
      this.db.data.policies || []

    return policies
      .map((policy) => ({

        id:
          policy.id ||
          `policy_${Date.now()}_${Math.random()}`,

        policyNumber:
          policy.policyNumber ||
          this.generatePolicyNumber(
            policy.type
          ),

        premium:
          policy.premium || 0,

        createdAt:
          policy.createdAt ||
          new Date().toISOString(),

        ...policy
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
  }

  // ======================
  // GET POLICY BY ID
  // ======================

  async getPolicyById(id) {

    await this.initializeDB()

    const policy =
      this.db.data.policies.find(
        (p) => p.id === id
      )

    if (!policy) return null

    return {
      premium: policy.premium || 0,
      ...policy
    }
  }

  // ======================
  // CREATE POLICY
  // ======================

  async createPolicy(policyData) {

    try {

      const policy =
        PolicyFactory.createPolicy(
          policyData.type,
          policyData
        )

      const policyDetails =
        policy.displayPolicyDetails()

      await this.initializeDB()

      const newPolicy = {

        id:
          policyDetails.id ||
          `policy_${Date.now()}`,

        policyNumber:
          policyDetails.policyNumber ||
          this.generatePolicyNumber(
            policyData.type
          ),

        createdAt:
          new Date().toISOString(),

        premium:
          policyDetails.premium || 0,

        ...policyDetails
      }

      this.db.data.policies.push(
        newPolicy
      )

      await this.db.write()

      return newPolicy

    } catch (error) {

      throw new InvalidPolicyException(
        error.message
      )
    }
  }

  // ======================
  // UPDATE POLICY
  // ======================

  async updatePolicy(id, updateData) {

    await this.initializeDB()

    const index =
      this.db.data.policies.findIndex(
        (p) => p.id === id
      )

    if (index === -1) {

      throw new InvalidPolicyException(
        'Policy not found'
      )
    }

    const existingPolicy =
      this.db.data.policies[index]

    const updatedPolicy = {

      ...existingPolicy,
      ...updateData,
      updatedAt:
        new Date().toISOString()
    }

    this.db.data.policies[index] =
      updatedPolicy

    await this.db.write()

    return updatedPolicy
  }

  // ======================
  // DELETE POLICY
  // ======================

  async deletePolicy(id) {

    await this.initializeDB()

    const index =
      this.db.data.policies.findIndex(
        (p) => p.id === id
      )

    if (index === -1) {

      throw new InvalidPolicyException(
        'Policy not found'
      )
    }

    this.db.data.policies.splice(
      index,
      1
    )

    await this.db.write()

    return {
      message:
        'Policy deleted successfully'
    }
  }

  // ======================
  // SEARCH POLICIES
  // ======================

  async searchPolicies(query = '') {

    await this.initializeDB()

    const search =
      query.toLowerCase()

    return this.db.data.policies.filter(
      (policy) => {

        const holder =
          policy?.policyHolder
            ?.toLowerCase?.() || ''

        const number =
          policy?.policyNumber
            ?.toLowerCase?.() || ''

        const type =
          policy?.type
            ?.toLowerCase?.() || ''

        return (
          holder.includes(search) ||
          number.includes(search) ||
          type.includes(search)
        )
      }
    )
  }

  // ======================
  // POLICY STATS
  // ======================

  async getPolicyStats() {

    await this.initializeDB()

    const policies =
      this.db.data.policies || []

    return {

      totalPolicies:
        policies.length,

      totalPremium:
        policies.reduce(
          (sum, p) =>
            sum + (p.premium || 0),
          0
        ),

      byType: {

        LIFE:
          policies.filter(
            (p) =>
              p.type === 'LIFE'
          ).length,

        HEALTH:
          policies.filter(
            (p) =>
              p.type === 'HEALTH'
          ).length,

        VEHICLE:
          policies.filter(
            (p) =>
              p.type === 'VEHICLE'
          ).length
      }
    }
  }
}

module.exports =
  new PolicyService()
// 🏥 Health Policy - Polymorphism
const Policy = require('./Policy');
const Insurable = require('./Insurable');

class HealthPolicy extends Policy {
  constructor(policyHolder, coverageAmount, preExistingConditions, durationInYears = 1) {
    super(policyHolder, coverageAmount, durationInYears);
    this.preExistingConditions = preExistingConditions || [];
    this.type = 'HEALTH';
  }

  calculatePremium() {
    // Health insurance: 0.8% of coverage + condition factor
    let basePremium = this.coverageAmount * 0.008;
    const conditionFactor = Math.min(this.preExistingConditions.length * 0.1, 0.5);
    return Math.round((basePremium + basePremium * conditionFactor) * 100) / 100;
  }

  displayPolicyDetails() {
    return {
      ...this.toJSON(),
      type: this.type,
      preExistingConditions: this.preExistingConditions,
      premium: this.calculatePremium(),
      details: `Health coverage with ${this.preExistingConditions.length} pre-existing conditions`
    };
  }
}

module.exports = HealthPolicy;
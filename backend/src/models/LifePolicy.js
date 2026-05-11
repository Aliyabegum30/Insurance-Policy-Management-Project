// 🌱 Life Policy - Demonstrates Inheritance & Polymorphism
const Policy = require('./Policy');
const Insurable = require('./Insurable');

class LifePolicy extends Policy {
  constructor(policyHolder, coverageAmount, age, durationInYears = 1) {
    super(policyHolder, coverageAmount, durationInYears);
    
    if (age < 18 || age > 80) {
      throw new Error("Age must be between 18 and 80 for Life Insurance");
    }
    
    this.age = age;
    this.type = 'LIFE';
  }

  // Polymorphism - Override calculatePremium()
  calculatePremium() {
    // Life insurance: 0.5% of coverage + age factor
    const basePremium = this.coverageAmount * 0.005;
    const ageFactor = Math.min(this.age / 100, 0.5);
    return Math.round((basePremium + basePremium * ageFactor) * 100) / 100;
  }

  // Polymorphism - Override displayPolicyDetails()
  displayPolicyDetails() {
    return {
      ...this.toJSON(),
      type: this.type,
      age: this.age,
      premium: this.calculatePremium(),
      details: `Life coverage for ${this.policyHolder}, Age: ${this.age}`
    };
  }
}

module.exports = LifePolicy;
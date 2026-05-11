// 🚗 Vehicle Policy - Complete OOP Implementation
const Policy = require('./Policy');
const Insurable = require('./Insurable');

class VehiclePolicy extends Policy {
  constructor(policyHolder, coverageAmount, vehicleType, vehicleValue, durationInYears = 1) {
    super(policyHolder, coverageAmount, durationInYears);
    this.vehicleType = vehicleType;
    this.vehicleValue = vehicleValue;
    this.type = 'VEHICLE';
  }

  calculatePremium() {
    // Vehicle insurance: 2% of vehicle value + type factor
    const basePremium = this.vehicleValue * 0.02;
    const typeFactors = { 'CAR': 1.0, 'BIKE': 0.7, 'TRUCK': 1.5 };
    const typeFactor = typeFactors[this.vehicleType] || 1.0;
    return Math.round((basePremium * typeFactor) * 100) / 100;
  }

  displayPolicyDetails() {
    return {
      ...this.toJSON(),
      type: this.type,
      vehicleType: this.vehicleType,
      vehicleValue: this.vehicleValue,
      premium: this.calculatePremium(),
      details: `${this.vehicleType} insurance for ${this.policyHolder}`
    };
  }
}

module.exports = VehiclePolicy;
// 🏭 Policy Factory - Factory Design Pattern
const LifePolicy = require('../models/LifePolicy');
const HealthPolicy = require('../models/HealthPolicy');
const VehiclePolicy = require('../models/VehiclePolicy');
const InvalidPolicyException = require('../models/InvalidPolicyException');

class PolicyFactory {
  static createPolicy(type, policyData) {
    switch (type.toUpperCase()) {
      case 'LIFE':
        return new LifePolicy(
          policyData.policyHolder,
          policyData.coverageAmount,
          policyData.age
        );
      
      case 'HEALTH':
        return new HealthPolicy(
          policyData.policyHolder,
          policyData.coverageAmount,
          policyData.preExistingConditions
        );
      
      case 'VEHICLE':
        return new VehiclePolicy(
          policyData.policyHolder,
          policyData.coverageAmount,
          policyData.vehicleType,
          policyData.vehicleValue
        );
      
      default:
        throw new InvalidPolicyException(`Invalid policy type: ${type}`);
    }
  }
}

module.exports = PolicyFactory;
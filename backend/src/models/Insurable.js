// 🎯 Insurable Interface - Demonstrates Interface concept
class Insurable {
  constructor() {
    if (this.constructor === Insurable) {
      throw new Error("Cannot instantiate abstract class Insurable");
    }
  }

  // Abstract methods - must be implemented by subclasses
  calculatePremium() {
    throw new Error("calculatePremium() must be implemented");
  }

  displayPolicyDetails() {
    throw new Error("displayPolicyDetails() must be implemented");
  }
}

module.exports = Insurable;
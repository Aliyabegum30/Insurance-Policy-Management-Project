// 🏗️ Base Policy Class - Demonstrates Encapsulation & Inheritance
const { v4: uuidv4 } = require('uuid');
const InvalidPolicyException = require('./InvalidPolicyException');

class Policy {
  #id;        // Private field - Encapsulation
  #policyNumber;
  #policyHolder;
  #startDate;
  #endDate;
  #coverageAmount;
  #status;

  constructor(policyHolder, coverageAmount, durationInYears = 1) {
    this.#id = uuidv4();
    this.#policyNumber = `POL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Validation - Exception Handling
    if (!policyHolder || policyHolder.length < 2) {
      throw new InvalidPolicyException("Policy holder name must be at least 2 characters");
    }
    
    if (coverageAmount < 1000) {
      throw new InvalidPolicyException("Coverage amount must be at least 1000");
    }

    this.#policyHolder = policyHolder;
    this.#coverageAmount = coverageAmount;
    this.#startDate = new Date().toISOString().split('T')[0];
    this.#endDate = new Date(Date.now() + durationInYears * 365 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];
    this.#status = 'ACTIVE';
  }

  // Getters - Encapsulation
  get id() { return this.#id; }
  get policyNumber() { return this.#policyNumber; }
  get policyHolder() { return this.#policyHolder; }
  get startDate() { return this.#startDate; }
  get endDate() { return this.#endDate; }
  get coverageAmount() { return this.#coverageAmount; }
  get status() { return this.#status; }

  // Setter with validation
  set status(newStatus) {
    const validStatuses = ['ACTIVE', 'EXPIRED', 'CANCELLED'];
    if (!validStatuses.includes(newStatus)) {
      throw new InvalidPolicyException(`Invalid status: ${newStatus}`);
    }
    this.#status = newStatus;
  }

  toJSON() {
    return {
      id: this.#id,
      policyNumber: this.#policyNumber,
      policyHolder: this.#policyHolder,
      startDate: this.#startDate,
      endDate: this.#endDate,
      coverageAmount: this.#coverageAmount,
      status: this.#status
    };
  }
}

module.exports = Policy;
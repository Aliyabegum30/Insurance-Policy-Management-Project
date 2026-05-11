// ❌ Custom Exception - Exception Handling
class InvalidPolicyException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidPolicyException';
    this.statusCode = 400;
  }
}

module.exports = InvalidPolicyException;
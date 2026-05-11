const Joi = require('joi');

const policySchema = Joi.object({
  type: Joi.string()
    .valid('LIFE', 'HEALTH', 'VEHICLE')
    .required(),

  policyHolder: Joi.string()
    .min(2)
    .max(100)
    .required(),

  coverageAmount: Joi.number()
    .min(1000)
    .required(),

  age: Joi.number()
    .min(18)
    .max(80)
    .when('type', {
      is: 'LIFE',
      then: Joi.required(),
      otherwise: Joi.optional()
    }),

  preExistingConditions: Joi.array()
    .items(Joi.string())
    .optional(),

  vehicleType: Joi.string()
    .valid('CAR', 'BIKE', 'TRUCK')
    .when('type', {
      is: 'VEHICLE',
      then: Joi.required(),
      otherwise: Joi.optional()
    }),

  vehicleValue: Joi.number()
    .min(10000)
    .when('type', {
      is: 'VEHICLE',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
});

const validatePolicy = (req, res, next) => {
  const { error } = policySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  policySchema,
  validatePolicy
};
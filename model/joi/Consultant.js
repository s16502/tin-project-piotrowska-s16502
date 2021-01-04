const Joi = require('joi');

const consSchema = Joi.object({
    consId: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required(),
    email: Joi.string()
        .email()
        .required()
});

module.exports = consSchema;


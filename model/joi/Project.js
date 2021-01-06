const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "date.base":
                err.message = `Pole powinno być datą w formacie DD-MM-YYYY`;
                break;
            default:
                break;
        }
    });
    return errors;
}


const projectSchema = Joi.object({
    projectId: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    date: Joi.date()
        .required()
        .error(errMessages),
    location: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
});

module.exports = projectSchema;





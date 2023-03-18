const Joi = require("Joi");

const createCompanyDto = Joi.object({
  name: Joi.string().required(),
  descr: Joi.string(),
});

const updateCompanyDto = Joi.object({
  name: Joi.string(),
  descr: Joi.string(),
});

module.exports = {
  createCompanyDto,
  updateCompanyDto,
};

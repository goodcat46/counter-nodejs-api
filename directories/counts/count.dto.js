const Joi = require("Joi");

const createCountDto = Joi.object({
  name: Joi.string().required().allow(null),
  owner: Joi.string().allow(null),
  code: Joi.string().allow(null),
  type: Joi.string().valid("ACTIVE", "PASSIVE").allow(null),
  balance: Joi.number().allow(null),
  descr: Joi.string().allow(null),
});

const updateCountDto = Joi.object({
  name: Joi.string().allow(null),
  owner: Joi.string().allow(null),
  code: Joi.string().allow(null),
  type: Joi.string().valid("ACTIVE", "PASSIVE").allow(null),
  descr: Joi.string().allow(null),
});
const correctCountBalanceDto = Joi.object({
  balance: Joi.number(),
});

module.exports = {
  createCountDto,
  updateCountDto,
  correctCountBalanceDto,
};

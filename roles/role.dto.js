const Joi = require("Joi");

const createRoleDto = Joi.object({
  name: Joi.string().required(),
  actions: Joi.array().items(Joi.string()),
  descr: Joi.string(),
});

const updateRoleDto = Joi.object({
  name: Joi.string(),
  actions: Joi.array().items(Joi.string()).min(1),
  descr: Joi.string(),
});

module.exports = {
  createRoleDto,
  updateRoleDto,
};

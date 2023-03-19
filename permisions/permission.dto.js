const Joi = require("Joi");

const createPermissionDto = Joi.object({
  user: Joi.string().required(),
  role: Joi.string().required(),
});

const updatePermissionDto = Joi.object({});

module.exports = {
  createPermissionDto,
  updatePermissionDto,
};

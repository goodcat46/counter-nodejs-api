const Joi = require("Joi");
const { categoryTypeEnum } = require("./categories.constants");

const createCategoryDto = Joi.object({
  name: Joi.string().required(),
  label: Joi.string(),
  owner: Joi.string(),
  type: Joi.string()
    .valid(...categoryTypeEnum)
    .required(),
  descr: Joi.string(),
});

const updateCategoryDto = Joi.object({
  name: Joi.string(),
  label: Joi.string(),
  owner: Joi.string(),
  type: Joi.string().valid(...categoryTypeEnum),
  descr: Joi.string(),
});

module.exports = {
  createCategoryDto,
  updateCategoryDto,
};

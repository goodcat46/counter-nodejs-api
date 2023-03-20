const Joi = require("Joi");
const { CATEORY_TYPE_ENUM } = require("./categories.constants");

const createCategoryDto = Joi.object({
  name: Joi.string().required(),
  label: Joi.string(),
  owner: Joi.string(),
  type: Joi.string()
    .valid(...CATEORY_TYPE_ENUM)
    .required(),
  descr: Joi.string(),
});

const updateCategoryDto = Joi.object({
  name: Joi.string(),
  label: Joi.string(),
  owner: Joi.string(),
  type: Joi.string().valid(...CATEORY_TYPE_ENUM),
  descr: Joi.string(),
});

module.exports = {
  createCategoryDto,
  updateCategoryDto,
};

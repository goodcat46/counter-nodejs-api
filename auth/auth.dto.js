const Joi = require("Joi");
const emailRegexp = require("../helpers/validateEmail");

const registerUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const resendVerificationEmail = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  resendVerificationEmail,
};

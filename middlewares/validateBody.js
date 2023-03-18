const createError = require("../helpers/createError");

function validateBody(schema) {
  if (!schema) {
    throw createError({
      status: 500,
      message: "schema not passed ============= >>>>>>>>>>>>",
    });
  }

  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error);
      throw createError({ status: 400, message: error.message });
    }

    next();
  };

  return fn;
}

module.exports = validateBody;

const CreateError = require("./createError");

function controllerWrapper(controller) {
  const fn = async (req, res, next) => {
    try {
      if (typeof controller === "function") {
        await controller(req, res, next);
        return;
      }
      CreateError({ status: 500, message: "Controller error" });
    } catch (error) {
      next(error);
    }
  };

  return fn;
}

module.exports = controllerWrapper;

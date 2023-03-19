const mongoose = require("mongoose");

function modelsInicializer(modelCreators = []) {
  function fn(req, _res, next) {
    const [companyId] = req.originalUrl.replace("/api/", "").split("/");

    console.log("req.baseUrl", req.originalUrl, companyId);
    if (!mongoose.isValidObjectId(companyId)) {
      console.log(
        "mongoose.isValidObjectId(companyId)",
        mongoose.isValidObjectId(companyId),
        companyId
      );
      next();
      return;
    }
    if (mongoose.isValidObjectId(companyId))
      console.log("companyId", companyId);

    console.log("inicializeModels mongoose.models before", mongoose.models);

    const Models = modelCreators.map(
      (modelCreator) => modelCreator && modelCreator(companyId)
    );

    console.log("inicializeModels mongoose.models after", {
      mongooseModels: mongoose.models,
      appModels: Models,
    });

    req.models = Models;

    next();
  }
  return fn;
}

module.exports = { modelsInicializer };

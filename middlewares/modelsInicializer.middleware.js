const mongoose = require("mongoose");

// ! const cachedModels = {}; // зовнішня змінна для зберігання створених моделей
const companiesCashedModels = [];

function modelsInitializer(modelCreators = []) {
  function fn(req, _res, next) {
    const [companyId] = req.originalUrl.replace("/api/", "").split("/");

    if (!mongoose.isValidObjectId(companyId)) {
      next();
      return;
    }

    if (companiesCashedModels.includes(companyId)) {
      // перевірка чи моделі вже були створені
      console.log("cachedModels", companiesCashedModels);
      // !  req.models = cachedModels[companyId];
    } else {
      modelCreators.map((modelCreator) => {
        if (typeof modelCreator === "function") return modelCreator(companyId);
        return null;
      });

      // ! cachedModels[companyId] = Models; // зберігання створених моделей
      companiesCashedModels.push(companyId);

      console.log("cachedModels", companiesCashedModels);
    }

    next();
  }

  return fn;
}

module.exports = modelsInitializer;

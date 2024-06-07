const mongoose = require("mongoose");

// ! const cachedModels = {}; // зовнішня змінна для зберігання створених моделей
const companiesCashedModels = [];

function modelsInitializer(fabrics = []) {
  function fn(req, _res, next) {
    const [companyId] = req.originalUrl.replace("/api/", "").split("/");

    if (!mongoose.isValidObjectId(companyId)) {
      next();
      return;
    }

    if (companiesCashedModels.includes(companyId)) {
      next();
      return;
      // перевірка чи моделі вже були створені
      // console.log("cachedModels", companiesCashedModels);
      // !  req.models = cachedModels[companyId];
    } else {
      fabrics.map(({ create }) => {
        if (typeof create === "function") {
          const Model = create(companyId);
          return Model;
        }

        return null;
      });

      // console.log("created models", models);
      // ! cachedModels[companyId] = Models; // зберігання створених моделей
      companiesCashedModels.push(companyId);

      // console.log("cachedModels", companiesCashedModels);
    }

    next();
  }

  return fn;
}

module.exports = modelsInitializer;

const CategoryControllers = require("./categories.controller");

const categoriesActionsMap = [
  {
    name: CategoryControllers.getAllCategories.name,
    title: "",
    descr: "Get all transactions withou filters",
  },
  {
    name: CategoryControllers.createCategory.name,
    title: "",
    descr: "For creating transactions",
  },
  {
    name: CategoryControllers.deleteCategoryById.name,
    title: "",
    descr: "For deleting transactions",
  },
  {
    name: CategoryControllers.updateCategoryById.name,
    title: "",
    descr: "For deleting transactions",
  },
];

module.exports = categoriesActionsMap;

const express = require("express");
const { controllerWrapper } = require("../helpers");
const {
  validateBody,
  authenticate,
  checkCompanyId,
} = require("../middlewares");
const CategoryDto = require("./category.dto");
const CategoriesController = require("./categories.controller");

const CategoriesRouter = express.Router();

CategoriesRouter.use(authenticate);
CategoriesRouter.use(checkCompanyId);

CategoriesRouter.get(
  "/getAll",
  controllerWrapper(CategoriesController.getAllCategories)
);

CategoriesRouter.post(
  "/create",
  validateBody(CategoryDto.createCategoryDto),
  controllerWrapper(CategoriesController.createCategory)
);

CategoriesRouter.delete(
  "/delete/:id",
  controllerWrapper(CategoriesController.deleteCategoryById)
);

CategoriesRouter.patch(
  "/update/:id",
  validateBody(CategoryDto.updateCategoryDto),
  controllerWrapper(CategoriesController.updateCategoryById)
);

module.exports = CategoriesRouter;

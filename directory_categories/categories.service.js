const CategoryModel = require("./category.model");
const { createError } = require("../helpers");
const { CategoriesMessages } = require("./categories.messages");

async function getAllCategories({ companyId }) {
  const Model = CategoryModel.create(companyId);
  return Model.find().populate("owner").exec();
}

async function findCategoryById({ id, companyId }) {
  const Model = CategoryModel.create(companyId);
  return Model.findById(id).populate("owner").exec();
}

async function findCategoryByName({ name, companyId }) {
  const Model = CategoryModel.create(companyId);
  return Model.findOne(name).populate("owner").exec();
}

async function createCategory({ newData, companyId }) {
  const Model = CategoryModel.create(companyId);
  const { name } = newData;

  const doc = await findCategoryByName({ name, companyId });

  if (doc) {
    throw createError({ status: 409, message: CategoriesMessages.NAME_IN_USE });
  }

  return Model.create(newData);
}

async function deleteCategoryById({ id, companyId }) {
  const Model = CategoryModel.create(companyId);
  return Model.findByIdAndDelete(id);
}

async function updateCategoryById({ id, updateData, companyId }) {
  const Model = CategoryModel.create(companyId);
  return Model.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function canHaveChildrenCheck({ id, companyId }) {
  const Model = CategoryModel.create(companyId);
  const parentDoc = await Model.findById(id);

  if (parentDoc && parentDoc?.owner) {
    return false;
  }

  return true;
}
const CategoriesService = {
  getAllCategories,
  findCategoryById,
  findCategoryByName,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  canHaveChildrenCheck,
};
module.exports = CategoriesService;

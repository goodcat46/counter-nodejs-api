const CategoryModel = require("./category.model");
const { createError } = require("../../helpers");
const { CategoriesMessages } = require("./categories.messages");

async function getAllCategories() {
  return CategoryModel.find().populate("owner").exec();
}

async function findCategoryById(id) {
  return CategoryModel.findById(id).populate("owner").exec();
}

async function findCategoryByName(name) {
  return CategoryModel.findOne(name).populate("owner").exec();
}

async function createCategory(newDoc) {
  const { name } = newDoc;

  const doc = await findCategoryByName({ name });

  if (doc) {
    throw createError({ status: 409, message: CategoriesMessages.NAME_IN_USE });
  }

  return CategoryModel.create(newDoc);
}

async function deleteCategoryById(id) {
  return CategoryModel.findByIdAndDelete(id);
}

async function updateCategoryById(id, updateData) {
  return CategoryModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function canHaveChildrenCheck(id) {
  const parentDoc = await CategoryModel.findById(id);

  if (parentDoc && parentDoc?.owner) {
    return false;
  }

  return true;
}

module.exports = {
  getAllCategories,
  findCategoryById,
  findCategoryByName,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  canHaveChildrenCheck,
};

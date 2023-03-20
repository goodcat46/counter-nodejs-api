const CategoriesService = require("./categories.service");
const CategoriesMessages = require("./categories.messages");
const { createError, HttpStatus } = require("../helpers");

async function createCategory(req, res) {
  const newData = req?.body;
  const companyId = req?.company?._id;

  const createdDoc = await CategoriesService.createCategory({
    newData,
    companyId,
  });

  if (!createdDoc) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: CategoriesMessages.CREATING_ERROR,
    });
  }

  res.status(201).json({
    message: CategoriesMessages.CREATING_SUCCESS,
    data: createdDoc,
  });
}

async function deleteCategoryById(req, res) {
  const { id } = req.params;
  const companyId = req?.company?._id;

  const deletedDoc = await CategoriesService.deleteCategoryById({
    id,
    companyId,
  });

  if (!deletedDoc) {
    throw createError({
      status: 404,
      message: CategoriesMessages.DELETING_ERROR,
    });
  }

  res.status(200).json({
    message: CategoriesMessages.DELETING_SUCCESS,
    data: deletedDoc,
  });
}

async function updateCategoryById(req, res) {
  const { body } = req;
  const { id } = req.params;
  const companyId = req?.company?._id;

  const updatedDoc = await CategoriesService.updateCategoryById({
    id,
    updateData: body,
    companyId,
  });

  if (!updatedDoc) {
    throw createError({
      status: 404,
      message: CategoriesMessages.UPDATING_ERROR,
    });
  }

  res.status(200).json({
    message: CategoriesMessages.UPDATING_SUCCESS,
    data: updatedDoc,
  });
}

async function getAllCategories(req, res) {
  const companyId = req?.company?._id;

  const allCategories = await CategoriesService.getAllCategories({ companyId });

  if (allCategories.length === 0) {
    throw createError({
      status: 404,
      message: CategoriesMessages.NOT_FOUND_ITEMS,
    });
  }

  res.status(200).json({
    message: CategoriesMessages.FOUND_ITEMS,
    data: allCategories,
  });
}

const CategoriesController = {
  createCategory,
  getAllCategories,
  deleteCategoryById,
  updateCategoryById,
};
module.exports = CategoriesController;

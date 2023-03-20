const { Schema, model, SchemaTypes, models } = require("mongoose");
const {
  CATEORY_TYPE_ENUM,
  CATEGORY_MODEL_NAME,
  CATEGORY_COLLECTION_NAME,
} = require("./categories.constants");
//!   { _id: 5, name: '', owner: '', type: '', code: '', descr: '' },

const getCategoryModelName = (companyId) =>
  `${companyId}_${CATEGORY_MODEL_NAME}`;
const getCategoriesCollectionName = (companyId) =>
  `${companyId}_${CATEGORY_COLLECTION_NAME}`;

const createCategorySchema = (companyId) =>
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
      },
      owner: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: getCategoryModelName(companyId),
      },
      type: {
        type: String,
        enum: CATEORY_TYPE_ENUM,
        required: [
          true,
          `Type is required / type one of: ${CATEORY_TYPE_ENUM.join(", ")}`,
        ],
      },
      descr: {
        type: String,
        default: null,
      },
      balance: {
        type: Number,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

const createCategoryModel = (companyId) => {
  if (models[getCategoryModelName(companyId)]) {
    return models[getCategoryModelName(companyId)];
  }
  const Model = model(
    getCategoryModelName(companyId),
    createCategorySchema(companyId),
    getCategoriesCollectionName(companyId)
  );

  return Model;
};

const CategoryModel = {
  create: createCategoryModel,
  getModelName: getCategoryModelName,
  getCollectionName: getCategoriesCollectionName,
};

module.exports = CategoryModel;

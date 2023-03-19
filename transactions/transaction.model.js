const { Schema, model, models } = require("mongoose");
const { AUTH_MODEL_NAME } = require("../auth/auth.constants");
const { CountsConstants } = require("../directories/counts");
const { CategoriesConstants } = require("../directories/categories");

const {
  getTransactionModelName,
  TRANSACTION_TYPE_ENUM,
  getTransactionsCollectionName,
} = require("./transactions.constants");

const createTransactionSchema = (companyId) =>
  new Schema(
    {
      athor: {
        type: Schema.Types.ObjectId,
        ref: AUTH_MODEL_NAME,
      },
      editor: {
        type: Schema.Types.ObjectId,
        ref: AUTH_MODEL_NAME,
      },
      auditor: {
        type: Schema.Types.ObjectId,
        ref: AUTH_MODEL_NAME,
      },
      transactionDate: {
        type: Date,
        default: new Date(),
      },
      type: {
        type: String,
        enum: TRANSACTION_TYPE_ENUM,
      },
      countIdIn: {
        type: Schema.Types.ObjectId,
        ref: CountsConstants.COUNT_MODEL_NAME,
      },
      subCountIdIn: {
        type: Schema.Types.ObjectId,
        ref: CountsConstants.COUNT_MODEL_NAME,
      },
      countIdOut: {
        type: Schema.Types.ObjectId,
        ref: CountsConstants.COUNT_MODEL_NAME,
      },
      subCountIdOut: {
        type: Schema.Types.ObjectId,
        ref: CountsConstants.COUNT_MODEL_NAME,
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: CategoriesConstants.CATEGORY_MODEL_NAME,
      },
      subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: CategoriesConstants.CATEGORY_MODEL_NAME,
      },
      amount: {
        type: Number,
        // required: [true, `Amount is required`],
      },
      document: {
        type: String,
      },
      project: {
        type: Schema.Types.ObjectId,
      },
      contractor: {
        type: Schema.Types.ObjectId,
      },
      status: {
        type: Schema.Types.ObjectId,
      },
      mark: {
        type: Schema.Types.ObjectId,
      },
      tags: {
        type: [
          {
            type: String,
          },
        ],
        eachPath: true,
      },
      comment: {
        type: String,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

const createTransactionModel = (companyId) => {
  if (models[getTransactionModelName(companyId)]) {
    return models[getTransactionModelName(companyId)];
  }
  const Model = model(
    getTransactionModelName(companyId),
    createTransactionSchema(companyId),
    getTransactionsCollectionName(companyId)
  );

  return Model;
};

module.exports = { createTransactionModel };

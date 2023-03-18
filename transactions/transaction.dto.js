const Joi = require("joi");
// const phoneRegexp = require("../helpers/validatePhone");

const { TransactionTypeEnum } = require("./transactions.constants");

const createTrDtoSet = {
  athor: Joi.string().allow(null),
  editor: Joi.string().allow(null),
  auditor: Joi.string().allow(null),
  transactionDate: Joi.string().allow(null),
  type: Joi.string()
    .valid(...TransactionTypeEnum)
    .allow(null),
  countIdIn: Joi.string().allow(null),
  subCountIdIn: Joi.string().allow(null),
  countIdOut: Joi.string().allow(null),
  subCountIdOut: Joi.string().allow(null),
  categoryId: Joi.string().allow(null),
  subCategoryId: Joi.string().allow(null),
  document: Joi.string().allow(null),
  project: Joi.string().allow(null),
  customer: Joi.string().allow(null),
  amount: Joi.number().allow(null),
  status: Joi.string().allow(null),
  mark: Joi.string().allow(null),
  tags: Joi.array().min(1).allow(null),
  comment: Joi.string().allow(null),
};

const addTransactionDto = Joi.object(createTrDtoSet);

const addManyTransactionsDto = Joi.array()
  .items(Joi.object(createTrDtoSet))
  .min(1)
  .max(10);

const updateTransactionDto = Joi.object({
  athor: Joi.string(),
  editor: Joi.string(),
  auditor: Joi.string(),
  transactionDate: Joi.string(),
  type: Joi.string().valid(...TransactionTypeEnum),
  countIdIn: Joi.string(),
  subCountIdIn: Joi.string(),
  countIdOut: Joi.string(),
  subCountIdOut: Joi.string(),
  categoryId: Joi.string(),
  subCategoryId: Joi.string(),
  document: Joi.string(),
  project: Joi.string(),
  customer: Joi.string(),
  amount: Joi.number(),
  status: Joi.string(),
  mark: Joi.string(),
  tags: Joi.array().min(1),
  comment: Joi.string(),
});

const deleteManyTrsDto = Joi.array().items(Joi.string()).min(1);

module.exports = {
  addTransactionDto,
  updateTransactionDto,
  addManyTransactionsDto,
  deleteManyTrsDto,
};

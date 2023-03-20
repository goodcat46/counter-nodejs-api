const TRANSACTION_MODEL_NAME = "transaction";
const getTransactionsCollectionName = (companyId) =>
  `${companyId}_transactions`;
const getTransactionModelName = (companyId) => `${companyId}_transaction`;
const EXPENSE = `EXPENSE`;
const INCOME = `INCOME`;
const TRANSFER = `TRANSFER`;
const CORRECT = `CORRECT`;
const ARCHIVED = "ARCHIVED";
const DELETED = "DELETED";
const TRANSACTION_TYPE_ENUM = [
  EXPENSE,
  INCOME,
  TRANSFER,
  CORRECT,
  ARCHIVED,
  DELETED,
];

module.exports = {
  TRANSACTION_TYPE_ENUM,
  TRANSACTION_MODEL_NAME,
  getTransactionsCollectionName,
  getTransactionModelName,
};

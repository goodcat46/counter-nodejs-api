const EXPENSE = `EXPENSE`;
const INCOME = `INCOME`;
const TRANSFER = `TRANSFER`;
const CORRECT = `CORRECT`;
const ARCHIVED = "ARCHIVED";
const DELETED = "DELETED";
const TransactionTypeEnum = [
  EXPENSE,
  INCOME,
  TRANSFER,
  CORRECT,
  ARCHIVED,
  DELETED,
];
const TRANSACTION_MODEL_NAME = "transaction";

module.exports = {
  TransactionTypeEnum,
  TRANSACTION_MODEL_NAME,
};

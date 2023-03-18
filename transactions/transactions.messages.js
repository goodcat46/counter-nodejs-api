const NOT_FOUND_TRANSACTIONS = `Not found any transations.`;
const NOT_FOUND_TRANSACTION_BY_ID = (id) =>
  `Not found any transactions with id:${id}.`;
const CREATING_SUCCESS = `Transaction created successfully.`;
const CREATING_ERROR = `Transaction creating error.`;
const DELETING_SUCCESS = `Transaction deleted successfully.`;
const DELETING_ERROR = `Transaction deleting error.`;
const CREATING_MANY_SUCCESS = (amount) =>
  `Transactions created successfully. Amount of items: ${amount}.`;
const CREATING_MANY_ERROR = `Transactions creating erro.r`;
const FOUND_TRANSACTIONS = (amount) =>
  `Transactions found. Amount of items: ${amount}.`;
const UPDATING_SUCCESS = `Transaction updated successfully.`;
const UPDATING_ERROR = `Transaction updating error.`;

module.exports = {
  CREATING_SUCCESS,
  CREATING_ERROR,
  NOT_FOUND_TRANSACTIONS,
  NOT_FOUND_TRANSACTION_BY_ID,
  CREATING_MANY_ERROR,
  CREATING_MANY_SUCCESS,
  DELETING_SUCCESS,
  DELETING_ERROR,
  FOUND_TRANSACTIONS,
  UPDATING_SUCCESS,
  UPDATING_ERROR,
};

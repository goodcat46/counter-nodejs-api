const getAll = require("./getAllTrs.controller");
const getTrById = require("./getTrById.controller");
const getAllTrsByCountIds = require("./getAllTrsByCountIds.controller");
const getAllTrsBySubCountIds = require("./getAllTrsBySubCountIds.controller");
const createTransaction = require("./createTr.controller");
const deleteTransactionById = require("./deleteTr.controller");
const updateTransaction = require("./updateTr.controller");
const createManyTransactions = require("./createManyTrs.controller");
const deleteManyTrById = require("./deleteManyTrById.controller");

module.exports = {
  getAll,
  getTrById,
  getAllTrsByCountIds,
  createTransaction,
  createManyTransactions,
  deleteTransactionById,
  updateTransaction,
  deleteManyTrById,
  getAllTrsBySubCountIds,
};

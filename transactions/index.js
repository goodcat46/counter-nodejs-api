const TransactionModel = require("./transaction.model");
const TransactionsRouter = require("./transactions.router");
const TransactionsControllers = require("./transactions.controller");
const TransactionsService = require("./transactions.service");
const TransactionMessages = require("./transactions.messages");
const TransactionsConstants = require("./transactions.constants");
const { transactionsActionsMap, tractionsMap } = require("./transactions.map");

const TransactionsModule = {
  TransactionModel,
  TransactionsRouter,
  TransactionsControllers,
  TransactionsService,
  TransactionMessages,
  TransactionsConstants,
  transactionsActionsMap,
  tractionsMap,
};

module.exports = TransactionsModule;

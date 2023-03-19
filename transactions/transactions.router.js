const express = require("express");

const TransactionControllers = require("./transactions.controller");
const TransactionsRouter = express.Router();
const TransactionDto = require("./transaction.dto");
// const validateBody = require("../middlewares/validateBody");
// const authenticate = require("../middlewares/authenticate");
// const UserCheck = require("../middlewares/UserCheck.middleware");
const { controllerWrapper } = require("../helpers");
const {
  authenticate,
  validateBody,
  checkCompanyId,
} = require("../middlewares");

TransactionsRouter.use(checkCompanyId);

TransactionsRouter.get(
  "/getAll",
  // authenticate,
  // UserCheck({ actionName: TransactionControllers.getAll.name }),
  controllerWrapper(TransactionControllers.getAllTransaction)
);
TransactionsRouter.get(
  "/getAll/byCountIds",
  // authenticate, validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.getAllTrsByCountIds)
);
TransactionsRouter.get(
  "/getAll/bySubCountIds",
  // authenticate, validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.getAllTrsBySubCountIds)
);

TransactionsRouter.get(
  "/:id",
  // authenticate,
  controllerWrapper(TransactionControllers.getById)
);

TransactionsRouter.post(
  "/create",
  // authenticate,
  validateBody(TransactionDto.addTransactionDto),
  controllerWrapper(TransactionControllers.createTransaction)
);

TransactionsRouter.post(
  "/createMany",
  // authenticate,
  validateBody(TransactionDto.addManyTransactionsDto),
  controllerWrapper(TransactionControllers.createManyTrs)
);

TransactionsRouter.delete(
  "/delete/:id",
  // authenticate,
  controllerWrapper(TransactionControllers.deleteTransaction)
);
TransactionsRouter.delete(
  "/deleteManyById",
  // authenticate,
  validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.deleteManyTrById)
);

TransactionsRouter.patch(
  "/:id",
  authenticate,
  validateBody(TransactionDto.updateTransactionDto),
  controllerWrapper(TransactionControllers.updateTransaction)
);

module.exports = TransactionsRouter;

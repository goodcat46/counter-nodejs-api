const express = require("express");

const TransactionControllers = require("./transactions.controller");
const TransactionsRouter = express.Router();
const TransactionDto = require("./transaction.dto");
// const UserCheck = require("../middlewares/UserCheck.middleware");
const { controllerWrapper } = require("../helpers");
const {
  authenticate,
  validateBody,
  checkCompanyId,
} = require("../middlewares");

TransactionsRouter.use(authenticate);
TransactionsRouter.use(checkCompanyId);

TransactionsRouter.get(
  "/getAll",
  // UserCheck({ actionName: TransactionControllers.getAll.name }),
  controllerWrapper(TransactionControllers.getAllTransactions)
);
TransactionsRouter.get(
  "/getAll/byCountIds",
  validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.getAllTrsByCountIds)
);
TransactionsRouter.get(
  "/getAll/bySubCountIds",
  validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.getAllTrsBySubCountIds)
);

TransactionsRouter.get(
  "/:id",
  controllerWrapper(TransactionControllers.getById)
);

TransactionsRouter.post(
  "/create",
  validateBody(TransactionDto.addTransactionDto),
  controllerWrapper(TransactionControllers.createTransaction)
);

TransactionsRouter.post(
  "/createMany",
  validateBody(TransactionDto.addManyTransactionsDto),
  controllerWrapper(TransactionControllers.createManyTrs)
);

TransactionsRouter.delete(
  "/delete/:id",
  controllerWrapper(TransactionControllers.deleteTransaction)
);
TransactionsRouter.delete(
  "/deleteManyById",
  validateBody(TransactionDto.deleteManyTrsDto),
  controllerWrapper(TransactionControllers.deleteManyTrById)
);

TransactionsRouter.patch(
  "/:id",
  validateBody(TransactionDto.updateTransactionDto),
  controllerWrapper(TransactionControllers.updateTransaction)
);

module.exports = TransactionsRouter;

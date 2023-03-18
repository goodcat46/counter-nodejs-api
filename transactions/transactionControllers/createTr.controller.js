const TransactionService = require("../transactions.service");
const TransactionMessages = require("../transactions.messages");
const { createError } = require("../../helpers");

async function createTransaction(req, res) {
  // const { id = "0000000" } = req?.user;

  const newTransactionData = {
    author: req?.user?.id || "0000000",
    ...req.body,
  };

  console.log("newTransaction", newTransactionData);

  const newTransaction = await TransactionService.createTransaction(
    newTransactionData
  );

  if (!newTransaction) {
    throw createError({
      status: 400,
      messages: TransactionMessages.CREATING_ERROR,
    });
  }

  res.status(201).send({
    message: TransactionMessages.CREATING_SUCCESS,
    data: newTransaction,
  });
}

module.exports = createTransaction;

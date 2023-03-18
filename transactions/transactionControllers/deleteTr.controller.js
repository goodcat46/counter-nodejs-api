const TransactionService = require("../transactions.service");
const TransactionMessages = require("../transactions.messages");
const { createError } = require("../../helpers");

async function deleteTransaction(req, res) {
  const { id } = req.params;

  const result = await TransactionService.deleteTransactionById(id);

  if (!result) {
    throw createError({
      status: 404,
      message: TransactionMessages.DELETING_ERROR,
    });
  }

  res
    .status(200)
    .json({ message: TransactionMessages.CREATING_SUCCESS, data: result });
}

module.exports = deleteTransaction;

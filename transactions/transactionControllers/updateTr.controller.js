const TransactionService = require("../transactions.service");
const TransactionsMessages = require("../transactions.messages");
const { createError } = require("../../helpers");

async function updateTransaction(req, res) {
  const { id } = req.params;

  const updateData = {
    editor: req?.user?._id,
    ...req.body,
  };
  const result = await TransactionService.updateTransactionById(id, updateData);

  if (!result) {
    throw createError({
      status: 404,
      message: TransactionsMessages.UPDATING_ERROR,
    });
  }

  res.status(200).send({
    message: TransactionsMessages.UPDATING_SUCCESS,
    data: result,
  });
}

module.exports = updateTransaction;

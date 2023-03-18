const TransactionService = require("../transactions.service");
const TransactionMessages = require("../transactions.messages");
const { createError } = require("../../helpers");

async function deleteManyTrById(req, res) {
  const { body } = req;

  const result = await TransactionService.deleteManyTrById(body);

  if (!result) {
    throw createError({
      status: 404,
      message: TransactionMessages.DELETING_ERROR,
    });
  }

  if (result.deletedCount === 0) {
    throw createError({
      status: 400,
      message: `${TransactionMessages.DELETING_ERROR} Nothing to delete`,
    });
  }

  res.status(200).json({
    message: TransactionMessages.DELETING_SUCCESS,
    data: result.deletedCount,
  });
}

module.exports = deleteManyTrById;

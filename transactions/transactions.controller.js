const TransactionService = require("./transactions.service");
const TransactionMessages = require("./transactions.messages");
const { createError } = require("../helpers");

async function createManyTrs(req, res) {
  const { id = "0000000" } = req?.user;
  const { _id: companyId } = req?.company;

  const newTrsArrData = req.body.map((tr) => ({
    author: id || "0000000",
    ...tr,
    type: tr?.type.toUpperCase(),
  }));

  const createdTrsData = await TransactionService.createManyTrs({
    trsArrData: newTrsArrData,
    companyId,
  });

  if (!createdTrsData) {
    throw createError({
      status: 400,
      message: TransactionMessages.CREATING_MANY_ERROR,
    });
  }

  console.log("createManyTrs conatroller", createdTrsData);
  res.status(201).send({
    message: TransactionMessages.CREATING_MANY_SUCCESS(createdTrsData.length),
    data: createdTrsData,
  });
}
async function createTransaction(req, res) {
  const { id = "0000000" } = req?.user;
  const { _id: companyId } = req?.company;

  const newTransactionData = {
    author: id || "0000000",
    ...req.body,
  };

  const newTransaction = await TransactionService.createTransaction({
    dto: newTransactionData,
    companyId,
  });

  if (!newTransaction) {
    throw createError({
      status: 400,
      messages: TransactionMessages.CREATING_ERROR,
    });
  }

  console.log("newTransaction", newTransaction);
  res.status(201).send({
    message: TransactionMessages.CREATING_SUCCESS,
    data: newTransaction,
  });
}
async function deleteManyTrById(req, res) {
  const { body } = req;
  const { _id: companyId } = req?.company;

  const result = await TransactionService.deleteManyTrById({
    idsArrData: body,
    companyId,
  });

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
async function deleteTransaction(req, res) {
  const { id } = req.params;
  const { _id: companyId } = req?.company;

  const result = await TransactionService.deleteTransactionById({
    id,
    companyId,
  });

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
async function getAllTransaction(req, res) {
  const { page = 1, limit = 20 } = req.query;
  const { _id: companyId } = req?.company;

  const skip = (page - 1) * limit;
  const paginationSettings = {
    limit,
    skip,
  };
  const searchParams = {};

  const allTransactions = await TransactionService.getAllTransactions({
    searchParams,
    paginationSettings,
    companyId,
  });

  res.json({
    message: TransactionMessages?.FOUND_TRANSACTIONS(allTransactions.length),
    data: allTransactions,
  });
}
async function getAllTrsByCountIds(req, res) {
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;
  const paginationSettings = {
    limit,
    skip,
  };

  const allTransactions = await TransactionService.getAllTrsByCountIds(
    req.body,
    paginationSettings
  );

  res.json({
    message: TransactionMessages?.FOUND_TRANSACTIONS(allTransactions.length),
    data: allTransactions,
  });
}
async function getAllTrsBySubCountIds(req, res) {
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;
  const paginationSettings = {
    limit,
    skip,
  };

  const allTransactions = await TransactionService.getAllTrsBySubCountIds(
    req.body,
    paginationSettings
  );

  res.json({
    message: TransactionMessages?.FOUND_TRANSACTIONS(allTransactions.length),
    data: allTransactions,
  });
}
async function getById(req, res) {
  const { id } = req.params;

  const result = await TransactionService.getById(id);

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.json({
    message: TransactionMessages.NOT_FOUND_TRANSACTION_BY_ID(id),
    data: result,
  });
}
async function updateTransaction(req, res) {
  const { id } = req.params;
  const { _id: companyId } = req?.company;

  const updateData = {
    editor: req?.user?._id,
    ...req.body,
  };
  const result = await TransactionService.updateTransactionById({
    id,
    updateData,
    companyId,
  });

  if (!result) {
    throw createError({
      status: 404,
      message: TransactionMessages.UPDATING_ERROR,
    });
  }

  res.status(200).send({
    message: TransactionMessages.UPDATING_SUCCESS,
    data: result,
  });
}

module.exports = {
  createManyTrs,
  createTransaction,
  deleteManyTrById,
  deleteTransaction,
  getAllTransaction,
  getAllTrsByCountIds,
  getAllTrsBySubCountIds,
  getById,
  updateTransaction,
};

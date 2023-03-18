const TransactionService = require("../transactions.service");
const TransactionMessages = require("../transactions.messages");
const { createError } = require("../../helpers");

async function createManyTrs(req, res) {
  // const { id = "0000000" } = req?.user;

  const newTrsArrData = req.body.map((tr) => ({
    author: req?.user?.id || "0000000",
    ...tr,
    type: tr?.type.toUpperCase(),
  }));

  console.log("newTrsArrData", newTrsArrData);

  const createdTrsData = await TransactionService.createManyTrs(newTrsArrData);

  console.log(createdTrsData);

  if (!createdTrsData) {
    throw createError({
      status: 400,
      message: TransactionMessages.CREATING_MANY_ERROR,
    });
  }

  res.status(201).send({
    message: TransactionMessages.CREATING_MANY_SUCCESS(createdTrsData.length),
    data: createdTrsData,
  });
}

module.exports = createManyTrs;

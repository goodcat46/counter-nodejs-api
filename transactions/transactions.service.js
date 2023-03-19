const { createTransactionModel } = require("./transaction.model");
// db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

async function getAllTransactions({ companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.find()
    .populate({ path: "countIdIn", select: "name code" })
    .populate({ path: "subCountIdIn", select: "name code" })
    .populate({ path: "countIdOut", select: "name code" })
    .populate({ path: "subCountIdOut", select: "name code" })
    .populate({ path: "categoryId", select: "name code" })
    .populate({ path: "subCategoryId", select: "name code" })
    .sort({ transactionDate: -1 });
}
async function getAllTrsByCountIds({ idsArrData, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.find({
    $or: [
      { countIdIn: { $in: idsArrData } },
      { countIdOut: { $in: idsArrData } },
    ],
  }).exec();
}
async function getAllTrsBySubCountIds({ idsArrData, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.find(
    {
      $or: [
        { subCountIdIn: { $in: idsArrData } },
        { subCountIdOut: { $in: idsArrData } },
      ],
    },
    "_id subCountIdIn subCountIdOut"
  )
    .sort({ _id: -1 })
    .exec();
}

async function createTransaction({ dto, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  const createdDoc = await TransactionModel.create(dto);

  return findTransactionById(createdDoc?._id);
}
async function createManyTrs({ trsArrData, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.insertMany(trsArrData);
}

async function updateTransactionById({ id, updateData, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function findTransactionById({ id, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.findById(id)
    .populate({ path: "countIdIn", select: "name code" })
    .populate({ path: "subCountIdIn", select: "name code" })
    .populate({ path: "countIdOut", select: "name code" })
    .populate({ path: "subCountIdOut", select: "name code" })
    .populate({ path: "categoryId", select: "name code" })
    .populate({ path: "subCategoryId", select: "name code" });
}

async function deleteTransactionById({ id, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.findByIdAndRemove(id);
}
async function deleteManyTrById({ idsArrData, companyId }) {
  const TransactionModel = createTransactionModel(companyId);

  return TransactionModel.deleteMany({ _id: { $in: idsArrData } });
}

module.exports = {
  getAllTransactions,
  getAllTrsByCountIds,
  getAllTrsBySubCountIds,
  createTransaction,
  findTransactionById,
  updateTransactionById,
  deleteTransactionById,
  createManyTrs,
  deleteManyTrById,
};

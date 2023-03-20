const TransactionModel = require("./transaction.model");
// db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

async function getAllTransactions({ companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.find()
    .populate({ path: "countIdIn", select: "name code" })
    .populate({ path: "subCountIdIn", select: "name code" })
    .populate({ path: "countIdOut", select: "name code" })
    .populate({ path: "subCountIdOut", select: "name code" })
    .populate({ path: "categoryId", select: "name code" })
    .populate({ path: "subCategoryId", select: "name code" })
    .sort({ transactionDate: -1 });
}
async function getAllTrsByCountIds({ idsArrData, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.find({
    $or: [
      { countIdIn: { $in: idsArrData } },
      { countIdOut: { $in: idsArrData } },
    ],
  }).exec();
}
async function getAllTrsBySubCountIds({ idsArrData, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.find(
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
  const Model = TransactionModel.create(companyId);

  const createdDoc = await Model.create(dto);

  return findTransactionById(createdDoc?._id);
}
async function createManyTrs({ trsArrData, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.insertMany(trsArrData);
}

async function updateTransactionById({ id, updateData, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function findTransactionById({ id, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.findById(id)
    .populate({ path: "countIdIn", select: "name code" })
    .populate({ path: "subCountIdIn", select: "name code" })
    .populate({ path: "countIdOut", select: "name code" })
    .populate({ path: "subCountIdOut", select: "name code" })
    .populate({ path: "categoryId", select: "name code" })
    .populate({ path: "subCategoryId", select: "name code" });
}

async function deleteTransactionById({ id, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.findByIdAndRemove(id);
}
async function deleteManyTrById({ idsArrData, companyId }) {
  const Model = TransactionModel.create(companyId);

  return Model.deleteMany({ _id: { $in: idsArrData } });
}

const TransactionsService = {
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
module.exports = TransactionsService;

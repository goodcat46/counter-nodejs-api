const CountModel = require("./count.model");
const { createError } = require("../helpers");

async function getAllCounts({ companyId }) {
  const Model = CountModel.create(companyId);

  return Model.find().populate("owner").exec();
}
async function findCountById({ id, companyId }) {
  const Model = CountModel.create(companyId);

  return Model.findById(id).populate("owner").exec();
}
async function findCountByName({ name, companyId }) {
  const Model = CountModel.create(companyId);

  return Model.findOne(name).populate("owner").exec();
}
async function createCount({ newCount, companyId }) {
  const Model = CountModel.create(companyId);

  const { name } = newCount;

  const Count = await findCountByName({ name });

  if (Count) {
    throw createError({ status: 409, message: "Count already exist" });
  }

  return Model.create(newCount);
}
async function deleteCountById({ id, companyId }) {
  const Model = CountModel.create(companyId);

  return Model.findByIdAndDelete(id);
}
async function updateCountById({ id, updateData, companyId }) {
  const Model = CountModel.create(companyId);

  return Model.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}
async function canHaveChildrenCheck({ id, companyId }) {
  const Model = CountModel.create(companyId);

  const parentDoc = await Model.findById(id);

  if (parentDoc && parentDoc?.owner) {
    return false;
  }

  return true;
}
const CountsService = {
  getAllCounts,
  findCountById,
  findCountByName,
  createCount,
  deleteCountById,
  updateCountById,
  canHaveChildrenCheck,
};
module.exports = CountsService;

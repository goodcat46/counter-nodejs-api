const CountModel = require("./count.model");
const { createError } = require("../../helpers");

async function getAllCounts() {
  return CountModel.find().populate("owner").exec();
}
async function findCountById(id) {
  return CountModel.findById(id).populate("owner").exec();
}
async function findCountByName(name) {
  return CountModel.findOne(name).populate("owner").exec();
}
async function createCount(newCount) {
  const { name } = newCount;

  const Count = await findCountByName({ name });

  if (Count) {
    throw createError({ status: 409, message: "Count already exist" });
  }

  return CountModel.create(newCount);
}
async function deleteCountById(id) {
  return CountModel.findByIdAndDelete(id);
}
async function updateCountById(id, updateData) {
  return CountModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function canHaveChildrenCheck(id) {
  const parentDoc = await CountModel.findById(id);

  if (parentDoc && parentDoc?.owner) {
    return false;
  }

  return true;
}

module.exports = {
  getAllCounts,
  findCountById,
  findCountByName,
  createCount,
  deleteCountById,
  updateCountById,
  canHaveChildrenCheck,
};

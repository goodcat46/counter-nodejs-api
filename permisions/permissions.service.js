const { createPermissionModel } = require("./permission.model");
const permissionsMessages = require("./permissions.messages");
const { HttpStatus } = require("../helpers");
const CreateError = require("../helpers/createError");

async function getAllPermissions({ companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.find({ company: companyId })
    .populate({ path: "user", select: "_id email createdAt updatedAt" })
    .populate({ path: "role", select: "_id name actions" });
}
async function createPermission({ newPermission, companyId }) {
  const Model = createPermissionModel(companyId);

  const { user, role } = newPermission;

  const oldPerm = await Model.findOne({ company: companyId, user, role });

  if (oldPerm) {
    throw CreateError({
      status: HttpStatus.CONFLICT,
      message: permissionsMessages.ALREADY_EXIST,
    });
  }

  return Model.create(newPermission);
}
async function findPermissionById({ id, companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.findById(id);
}
async function findPermissionByCompanyId({ companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.find({ company: companyId });
}
async function findPermissionByUserId({ userId }) {
  const Model = createPermissionModel();
  return Model.find({ user: userId });
}
async function findPermissionByRoleId({ roleId, companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.find({ roleId: roleId });
}
async function deletePermissionById({ id, companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.findByIdAndDelete(id);
}
async function updatePermissionById({ id, updateData, companyId }) {
  const Model = createPermissionModel(companyId);
  return Model.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

module.exports = {
  getAllPermissions,
  findPermissionById,
  createPermission,
  findPermissionByCompanyId,
  findPermissionByUserId,
  findPermissionByRoleId,
  deletePermissionById,
  updatePermissionById,
};

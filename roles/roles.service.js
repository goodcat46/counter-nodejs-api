const { createError, HttpStatus } = require("../helpers");
const AuthMessages = require("../auth/auth.messages");

const RoleModel = require("./role.model");

async function getAllRoles({ companyId }) {
  const Model = RoleModel.create(companyId);
  return Model.find();
}
async function findRoleById({ id, companyId }) {
  const Model = RoleModel.create();
  return Model.findById(id);
}
async function findRoleByName({ name, companyId }) {
  const Model = RoleModel.create(companyId);

  return Model.findOne({ name });
}
async function createRole({ newData, companyId }) {
  const Model = RoleModel.create(companyId);
  const { name } = newData;

  const role = await findRoleByName({ name, companyId });
  console.log("findRoleByName", role);
  if (role) {
    throw createError({ status: 409, message: "Role already exist" });
  }

  return Model.create(newData);
}
async function deleteRoleById({ id, companyId }) {
  const Model = RoleModel.create(companyId);

  return Model.findByIdAndDelete(id);
}
async function updateRoleById({ id, updateData, companyId }) {
  const Model = RoleModel.create(companyId);
  return Model.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}
async function addActionsToRoleById({ id, actions, companyId }) {
  const Model = RoleModel.create(companyId);
  return Model.findByIdAndUpdate(
    id,
    { $addToSet: { actions: { $each: actions } } },
    {
      new: true,
    }
  );
}
async function removeActionsFromRoleById({ id, actions, companyId }) {
  const Model = RoleModel.create(companyId);

  return Model.findByIdAndUpdate(
    id,
    { $pull: { actions: { $in: actions } } }, // { fruits: { $in: [ "apples", "oranges" ] }
    {
      new: true,
    }
  );
}
async function UserCheckByRole({ roleName, actionName, error, companyId }) {
  const userRole = await findRoleByName({ name: roleName, companyId });

  if (!userRole.actions.includes(actionName)) {
    throw createError({
      status: HttpStatus.FORBIDDEN,
      message: AuthMessages.FORBIDDEN_ACTION,
    });
  }

  return { canActive: true };
}

module.exports = {
  getAllRoles,
  findRoleById,
  findRoleByName,
  createRole,
  updateRoleById,
  deleteRoleById,
  addActionsToRoleById,
  removeActionsFromRoleById,
  UserCheckByRole,
};

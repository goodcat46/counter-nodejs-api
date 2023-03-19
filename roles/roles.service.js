const { createError, HttpStatus } = require("../helpers");
const AuthMessages = require("../auth/auth.messages");

const createRoleModel = require("./role.model");

async function getAllRoles({ companyID }) {
  const RoleModel = createRoleModel(companyID);
  return RoleModel.find();
}
async function findRoleById({ id, companyID }) {
  const RoleModel = createRoleModel();
  return RoleModel.findById(id);
}
async function findRoleByName({ name, companyID }) {
  const RoleModel = createRoleModel(companyID);

  return RoleModel.findOne({ name });
}
async function createRole({ newData, companyID }) {
  const RoleModel = createRoleModel(companyID);
  const { name } = newData;

  const role = await findRoleByName({ name, companyID });
  console.log("findRoleByName", role);
  if (role) {
    throw createError({ status: 409, message: "Role already exist" });
  }

  return RoleModel.create(newData);
}
async function deleteRoleById({ id, companyID }) {
  const RoleModel = createRoleModel(companyID);

  return RoleModel.findByIdAndDelete(id);
}
async function updateRoleById({ id, updateData, companyID }) {
  const RoleModel = createRoleModel(companyID);
  return RoleModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}
async function addActionsToRoleById({ id, actions, companyID }) {
  const RoleModel = createRoleModel(companyID);
  return RoleModel.findByIdAndUpdate(
    id,
    { $addToSet: { actions: { $each: actions } } },
    {
      new: true,
    }
  );
}
async function removeActionsFromRoleById({ id, actions, companyID }) {
  const RoleModel = createRoleModel(companyID);
  return RoleModel.findByIdAndUpdate(
    id,
    { $pull: { actions: { $in: actions } } }, // { fruits: { $in: [ "apples", "oranges" ] }
    {
      new: true,
    }
  );
}
async function UserCheckByRole({ roleName, actionName, error, companyID }) {
  const userRole = await findRoleByName({ name: roleName, companyID });

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

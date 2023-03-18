const { createError, HttpStatus } = require("../helpers");
const AuthMessages = require("../auth/auth.messages");

const RoleModel = require("./role.model");

async function getAllRoles() {
  return RoleModel.find();
}
async function findRoleById(id) {
  return RoleModel.findById(id);
}
async function findRoleByName(name) {
  return RoleModel.findOne(name);
}
async function createRole(newRole) {
  const { name } = newRole;

  const role = await findRoleByName({ name });

  if (role) {
    throw createError({ status: 409, message: "Role already exist" });
  }

  return RoleModel.create(newRole);
}
async function deleteRoleById(id) {
  return RoleModel.findByIdAndDelete(id);
}
async function updateRoleById(id, updateData) {
  return RoleModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}
async function addActionsToRoleById(id, routes) {
  return RoleModel.findByIdAndUpdate(
    id,
    { $addToSet: { routes: { $each: routes } } },
    {
      new: true,
    }
  );
}
async function removeActionsFromRoleById(id, routes) {
  return RoleModel.findByIdAndUpdate(
    id,
    { $pull: { routes: { $in: routes } } }, // { fruits: { $in: [ "apples", "oranges" ] }
    {
      new: true,
    }
  );
}
async function UserCheckByRole({ role, actionName, error }) {
  const userRole = await findRoleByName(role);

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

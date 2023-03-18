const RolesService = require("./roles.service");
const RolesMessages = require("./roles.messages");
const { createError, HttpStatus } = require("../helpers");
const { apiActions } = require("./actionsNames.map");

async function createRole(req, res) {
  const { name, routes, description } = req.body;

  const newRole = {
    name,
    routes,
    description,
  };

  const createdRole = await RolesService.createRole(newRole);

  if (!createdRole) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: RolesMessages.CREATING_ERROR,
    });
  }

  res.status(HttpStatus.CREATED).json({
    message: RolesMessages.CREATING_SUCCESS,
    data: createdRole,
  });
}
async function deleteRoleById(req, res) {
  const { id } = req.params;

  const deletedDoc = await RolesService.deleteRoleById(id);

  if (!deletedDoc) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: RolesMessages.DELETING_ERROR,
    });
  }

  res.status(HttpStatus.OK).json({
    message: RolesMessages.DELETING_SUCCESS,
    data: deletedDoc,
  });
}
async function addActionsToRoleById(req, res) {
  const { routes } = req.body;
  const { id } = req.params;

  const updatedDoc = await RolesService.addActionsToRoleById(id, routes);

  if (!updatedDoc) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: RolesMessages.UPDATING_ERROR,
    });
  }

  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message: RolesMessages.UPDATING_SUCCESS,
    data: updatedDoc,
  });
}
async function removeActionsFromRoleById(req, res) {
  const { routes } = req.body;
  const { id } = req.params;

  const updatedDoc = await RolesService.removeActionsFromRoleById(id, routes);

  if (!updatedDoc) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: RolesMessages.UPDATING_ERROR,
    });
  }

  res.status(HttpStatus.OK).json({
    message: RolesMessages.UPDATING_SUCCESS,
    data: updatedDoc,
  });
}
async function getAllRoles(_req, res) {
  const allRoles = await RolesService.getAllRoles();

  if (allRoles.length === 0) {
    throw createError({ status: HttpStatus.NOT_FOUND });
  }

  res.status(HttpStatus.CREATED).json({
    message: RolesMessages.FOUND_ROLES,
    data: allRoles,
  });
}
async function getAllActions() {
  return apiActions;
}

module.exports = {
  createRole,
  deleteRoleById,
  getAllRoles,
  addActionsToRoleById,
  removeActionsFromRoleById,
  getAllActions,
};

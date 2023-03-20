const RolesService = require("./roles.service");
const RolesMessages = require("./roles.messages");
const { createError, HttpStatus } = require("../helpers");
const { apiActions } = require("./actionsNames.map");

async function createRole(req, res) {
  const { name, actions, descr } = req.body;
  const { _id: companyId } = req.company;

  const newData = {
    name,
    actions,
    descr,
  };

  const createdRole = await RolesService.createRole({ newData, companyId });

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
  const { _id: companyId } = req.company;

  const deletedDoc = await RolesService.deleteRoleById({ id, companyId });

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
  const { actions } = req.body;
  const { id } = req.params;
  const { _id: companyId } = req.company;

  const updatedDoc = await RolesService.addActionsToRoleById({
    id,
    actions,
    companyId,
  });

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
  const { actions } = req.body;
  const { id } = req.params;
  const { _id: companyId } = req.company;

  const updatedDoc = await RolesService.removeActionsFromRoleById({
    id,
    actions,
    companyId,
  });

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
async function getAllRoles(req, res) {
  const { _id: companyId } = req.company;

  const allRoles = await RolesService.getAllRoles({ companyId });

  if (allRoles.length === 0) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: RolesMessages.NOT_FOUND_ROLES,
    });
  }

  res.status(HttpStatus.OK).json({
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

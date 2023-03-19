const { createError, HttpStatus } = require("../helpers");
const permissionsMessages = require("./permissions.messages");

const PermissionsService = require("./permissions.service");

async function createPermission(req, res) {
  const { user, role } = req.body;
  const { _id: companyId } = req?.company;

  const newPermission = {
    company: companyId,
    user,
    role,
  };
  console.log("object", newPermission);

  const createdPermission = await PermissionsService.createPermission({
    companyId,
    newPermission,
  });

  if (!createdPermission) {
    throw createError({
      status: HttpStatus.BAD_REQUEST,
      message: permissionsMessages.CREATE_ERROR,
    });
  }

  res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    message: permissionsMessages.CREATE_SUCCESS,
    data: createdPermission,
  });
}
async function getAllPermissions(_req, res) {
  const allPermissions = await PermissionsService.getAllPermissions();

  if (allPermissions.length === 0) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: permissionsMessages.FOUND_RESULT_ERROR(allPermissions.length),
    });
  }

  res.status(HttpStatus.CREATED).json({
    message: permissionsMessages.FOUND_RESULT_SUCCESS(allPermissions.length),
    data: allPermissions,
  });
}

module.exports = {
  createPermission,
  getAllPermissions,
};

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

  const createdPermission = await PermissionsService.createPermission({
    newPermission,
    companyId,
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
async function getAllPermissions(req, res) {
  const { _id: companyId } = req?.company;

  const allPermissions = await PermissionsService.getAllPermissions({
    companyId,
  });

  if (allPermissions.length === 0) {
    console.log(permissionsMessages.FOUND_RESULT_ERROR(allPermissions.length));
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: permissionsMessages.FOUND_RESULT_ERROR(allPermissions.length),
    });
  }

  res.status(HttpStatus.OK).json({
    message: permissionsMessages.FOUND_RESULT_SUCCESS(allPermissions.length),
    data: allPermissions,
  });
}

module.exports = {
  createPermission,
  getAllPermissions,
};

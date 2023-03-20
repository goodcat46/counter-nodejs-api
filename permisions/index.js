const PermissionDto = require("./permission.dto");
const PermissionModel = require("./permission.model");
const PermissionsMessages = require("./permissions.messages");
const PermissionsRouter = require("./permissions.router");
const PermissionsService = require("./permissions.service");
const PermissionsConstants = require("./permissions.constants");

const PermissionModule = {
  PermissionDto,
  PermissionsMessages,
  PermissionsRouter,
  PermissionsService,
  PermissionsConstants,
  PermissionModel,
};

module.exports = PermissionModule;

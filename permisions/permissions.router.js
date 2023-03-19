const express = require("express");
const PermissionsRouter = express.Router();
const PermissionsControllers = require("./permissions.controller");
const { controllerWrapper } = require("../helpers");
const { validateBody, checkCompanyId } = require("../middlewares");
// const authenticate = require("../middlewares/authenticate");
const PermissionDto = require("./permission.dto");

PermissionsRouter.use(checkCompanyId);

PermissionsRouter.get(
  "/getAll",
  // authenticate,
  controllerWrapper(PermissionsControllers.getAllPermissions)
);

PermissionsRouter.post(
  "/create",
  // authenticate,
  validateBody(PermissionDto.createPermissionDto),
  controllerWrapper(PermissionsControllers.createPermission)
);

module.exports = PermissionsRouter;

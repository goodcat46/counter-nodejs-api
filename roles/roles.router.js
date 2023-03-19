const express = require("express");
const RolesRouter = express.Router();
const RoleControllers = require("./roles.controller");
const { controllerWrapper } = require("../helpers");
const validateBody = require("../middlewares/validateBody");
const authenticate = require("../middlewares/authenticate");
const RoleDto = require("./role.dto");
const { checkCompanyId } = require("../middlewares");

// console.log("roles router", middlewares);

RolesRouter.get(
  "/getAll",
  // middlewares.authenticate,
  checkCompanyId,
  controllerWrapper(RoleControllers.getAllRoles)
);

RolesRouter.post(
  "/create",
  authenticate,
  checkCompanyId,
  validateBody(RoleDto.createRoleDto),
  controllerWrapper(RoleControllers.createRole)
);

RolesRouter.delete(
  "/:id",
  authenticate,
  checkCompanyId,
  controllerWrapper(RoleControllers.deleteRoleById)
);

RolesRouter.patch(
  "/addActions/:id",
  authenticate,
  checkCompanyId,
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.addActionsToRoleById)
);

RolesRouter.patch(
  "/removeActions/:id",
  authenticate,
  checkCompanyId,
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.removeActionsFromRoleById)
);

module.exports = RolesRouter;

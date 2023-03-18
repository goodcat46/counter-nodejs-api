const express = require("express");
const RolesRouter = express.Router();
const RoleControllers = require("./roles.controller");
const { controllerWrapper } = require("../helpers");
const validateBody = require("../middlewares/validateBody");
const authenticate = require("../middlewares/authenticate");
const RoleDto = require("./role.dto");

// console.log("roles router", middlewares);

RolesRouter.get(
  "/getAll",
  // middlewares.authenticate,
  controllerWrapper(RoleControllers.getAllRoles)
);

RolesRouter.post(
  "/create",
  authenticate,
  validateBody(RoleDto.createRoleDto),
  controllerWrapper(RoleControllers.createRole)
);

RolesRouter.delete(
  "/:id",
  authenticate,
  controllerWrapper(RoleControllers.deleteRoleById)
);

RolesRouter.patch(
  "/addActions/:id",
  authenticate,
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.addActionsToRoleById)
);

RolesRouter.patch(
  "/removeActions/:id",
  authenticate,
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.removeActionsFromRoleById)
);

module.exports = RolesRouter;

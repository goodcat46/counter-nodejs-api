const express = require("express");
const RolesRouter = express.Router();
const RoleControllers = require("./roles.controller");
const { controllerWrapper } = require("../helpers");
const validateBody = require("../middlewares/validateBody");
const authenticate = require("../middlewares/authenticate");
const RoleDto = require("./role.dto");
const { checkCompanyId } = require("../middlewares");

RolesRouter.use(authenticate);
RolesRouter.use(checkCompanyId);

RolesRouter.get("/getAll", controllerWrapper(RoleControllers.getAllRoles));

RolesRouter.post(
  "/create",
  validateBody(RoleDto.createRoleDto),
  controllerWrapper(RoleControllers.createRole)
);

RolesRouter.delete("/:id", controllerWrapper(RoleControllers.deleteRoleById));

RolesRouter.patch(
  "/addActions/:id",
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.addActionsToRoleById)
);

RolesRouter.patch(
  "/removeActions/:id",
  validateBody(RoleDto.updateRoleDto),
  controllerWrapper(RoleControllers.removeActionsFromRoleById)
);

module.exports = RolesRouter;

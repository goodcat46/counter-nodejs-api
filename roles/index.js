const RoleDto = require("./role.dto");
const RoleModel = require("./role.model");
const RolesMessages = require("./roles.messages");
const RolesRouter = require("./roles.router");
const RolesService = require("./roles.service");

const RolesModule = {
  RoleDto,
  RolesMessages,
  RolesRouter,
  RolesService,
  RoleModel,
};

module.exports = RolesModule;

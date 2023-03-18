const AuthServise = require("../auth/auth.service");
const RolesService = require("../roles/roles.service");
const AuthMessages = require("../auth/auth.messages");
const { HttpStatus } = require("../helpers");

function UserCheck({ actionName = "" } = {}) {
  console.log("UserCheck actionName ======= >>>>>>>>>", actionName);

  async function authenticate(req, res, next) {
    try {
      const { role, user } = await AuthServise.UserCheckByToken(req, res, next);

      if (actionName) {
        const { canActive } = await RolesService.UserCheckByRole({
          role,
          actionName,
          error: {
            status: HttpStatus.FORBIDDEN,
            message: AuthMessages.FORBIDDEN_ACTION,
          },
        });
        console.log("by role", canActive);
      }

      req.user = user;

      next();
    } catch (error) {
      if (!error.status) {
        error.status = HttpStatus.UNAUTHORIZED;
        error.message = AuthMessages.FORBIDDEN_ACTION;
      }

      next(error);
    }
  }
  return authenticate;
}

module.exports = UserCheck;

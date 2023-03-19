const express = require("express");

const AuthRouter = express.Router();

const controllers = require("./authControllers");
const middlewares = require("../middlewares");
const UserDto = require("./auth.dto");
const controllerWrapper = require("../helpers/controllerWrapper");

AuthRouter.post(
  "/register",
  middlewares.validateBody(UserDto.registerUserSchema),
  controllerWrapper(controllers.registerUser)
);

AuthRouter.get(
  "/login",
  middlewares.validateBody(UserDto.loginUserSchema),
  controllerWrapper(controllers.loginUser)
);

AuthRouter.get(
  "/current",
  middlewares.authenticate,
  controllerWrapper(controllers.getCurrentUser)
);
AuthRouter.get(
  "/currentUserInfo",
  middlewares.authenticate,
  controllerWrapper(controllers.getCurrentUserInfo)
);

AuthRouter.post(
  "/logout",
  middlewares.authenticate,
  controllerWrapper(controllers.logoutUser)
);

AuthRouter.post(
  "/verify",
  middlewares.validateBody(UserDto.resendVerificationEmail),
  controllerWrapper(controllers.resendVerificationEmail)
);

AuthRouter.get(
  "/verify/:verificationToken",
  controllerWrapper(controllers.verify)
);

AuthRouter.get(
  "/getRefreshToken",
  middlewares.authenticateRefreshToken,
  controllerWrapper(controllers.refreshToken)
);

module.exports = AuthRouter;

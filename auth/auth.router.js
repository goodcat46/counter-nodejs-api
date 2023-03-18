const express = require("express");

const AuthsRouter = express.Router();

const controllers = require("./authControllers");
const middlewares = require("../middlewares");
const UserDto = require("./auth.dto");
const controllerWrapper = require("../helpers/controllerWrapper");

AuthsRouter.post(
  "/register",
  middlewares.validateBody(UserDto.registerUserSchema),
  controllerWrapper(controllers.registerUser)
);

AuthsRouter.get(
  "/login",
  middlewares.validateBody(UserDto.loginUserSchema),
  controllerWrapper(controllers.loginUser)
);

AuthsRouter.get(
  "/current",
  middlewares.authenticate,
  controllerWrapper(controllers.getCurrentUser)
);

AuthsRouter.post(
  "/logout",
  middlewares.authenticate,
  controllerWrapper(controllers.logoutUser)
);

AuthsRouter.post(
  "/verify",
  middlewares.validateBody(UserDto.resendVerificationEmail),
  controllerWrapper(controllers.resendVerificationEmail)
);

AuthsRouter.get(
  "/refreshToken",
  middlewares.authenticateRefreshToken,
  controllerWrapper(controllers.refreshToken)
);

AuthsRouter.get(
  "/verify/:verificationToken",
  controllerWrapper(controllers.verify)
);

module.exports = AuthsRouter;

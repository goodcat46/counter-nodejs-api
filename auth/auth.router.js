const express = require("express");

const AuthRouter = express.Router();

const AuthController = require("./authControllers");
const middlewares = require("../middlewares");
const UserDto = require("./auth.dto");
const controllerWrapper = require("../helpers/controllerWrapper");

AuthRouter.post(
  "/register",
  middlewares.validateBody(UserDto.registerUserSchema),
  controllerWrapper(AuthController.registerUser)
);

AuthRouter.get(
  "/login",
  middlewares.validateBody(UserDto.loginUserSchema),
  controllerWrapper(AuthController.loginUser)
);

AuthRouter.get(
  "/current",
  middlewares.authenticate,
  controllerWrapper(AuthController.getCurrentUser)
);
AuthRouter.get(
  "/currentUserInfo",
  middlewares.authenticate,
  controllerWrapper(AuthController.getCurrentUserInfo)
);

AuthRouter.post(
  "/logout",
  middlewares.authenticate,
  controllerWrapper(AuthController.logoutUser)
);

AuthRouter.post(
  "/verify",
  middlewares.validateBody(UserDto.resendVerificationEmail),
  controllerWrapper(AuthController.resendVerificationEmail)
);

AuthRouter.get(
  "/verify/:verificationToken",
  controllerWrapper(AuthController.verify)
);

AuthRouter.get(
  "/getRefreshToken",
  middlewares.authenticateRefreshToken,
  controllerWrapper(AuthController.refreshToken)
);

module.exports = AuthRouter;

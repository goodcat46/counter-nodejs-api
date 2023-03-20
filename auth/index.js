const AuthDto = require("./auth.dto");
const AuthMessages = require("./auth.messages");
const AuthRouter = require("./auth.router");
const AuthServise = require("./auth.service");
const AuthConstants = require("./auth.constants");

const AuthModule = {
  AuthDto,
  AuthMessages,
  AuthRouter,
  AuthServise,
  AuthConstants,
};
module.exports = AuthModule;

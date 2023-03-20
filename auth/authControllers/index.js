const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const verify = require("./verify");
const resendVerificationEmail = require("./resendVerificationEmail");
const refreshToken = require("./refreshToken");
const getCurrentUserInfo = require("./getCurrentUserInfo");

const AuthController = {
  registerUser,
  loginUser,
  getCurrentUser,
  getCurrentUserInfo,
  logoutUser,
  verify,
  resendVerificationEmail,
  refreshToken,
};
module.exports = AuthController;

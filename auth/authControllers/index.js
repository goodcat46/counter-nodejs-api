const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const verify = require("./verify");
const resendVerificationEmail = require("./resendVerificationEmail");
const refreshToken = require("./refreshToken");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  verify,
  resendVerificationEmail,
  refreshToken,
};

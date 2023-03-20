const EMAIL_IN_USE = `Email in use`;
const NOT_VERIFY_EMAIL = (email) =>
  `User with email${email}. Please verify you email`;
const NOT_FOUND_USER = "Email or password is wrong";
const CREATING_SUCCESS = `User created duccessfuly`;
const FORBIDDEN_ACTION = `Forbiden action for this role`;
const CURRENT_USER_INFO = "Current user info";
const LOG_OUT_SUCCESS = "Log out success";
const LOG_OUT_ERROR = "Log out error";

const AuthMessages = {
  EMAIL_IN_USE,
  NOT_VERIFY_EMAIL,
  CREATING_SUCCESS,
  NOT_FOUND_USER,
  FORBIDDEN_ACTION,
  CURRENT_USER_INFO,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
};
module.exports = AuthMessages;

const EMAIL_IN_USE = `Email in use`;

const NOT_VERIFY_EMAIL = (email) =>
  `User with email${email}. Please verify you email`;

const NOT_FOUND_USER = "Email or password is wrong";

const CREATING_SUCCESS = `User created duccessfuly`;

const FORBIDDEN_ACTION = `Forbiden action for this role`;

module.exports = {
  EMAIL_IN_USE,
  NOT_VERIFY_EMAIL,
  CREATING_SUCCESS,
  NOT_FOUND_USER,
  FORBIDDEN_ACTION,
};

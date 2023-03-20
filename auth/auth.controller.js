const AuthService = require("./auth.service");
const AuthMessages = require("./auth.messages");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError, HttpStatus } = require("../helpers");
// const cookieParser = require("cookie-parser");

const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

async function getCurrentUser(req, res) {
  const { _id, email } = req.user;

  res.json({
    email,
    _id,
  });
}
async function getCurrentUserInfo(req, res) {
  const { email, _id } = req.user;

  const currentUserInfo = await AuthService.findUserByEmail(email);

  res.json({
    message: AuthMessages.CURRENT_USER_INFO,
    email,
    _id,
    currentUserInfo,
  });
}
async function loginUser(req, res) {
  const { password, email } = req.body;

  const user = await AuthService.findUserByEmail(email);

  // if (user.verificationToken) {
  //   throw createError({
  //     status: 401,
  //     message: "User not verified. Please verify you email",
  //   });
  // }

  const passwordCompare = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCompare) {
    throw createError({ status: 401, message: "Email or password is wrong" });
  }

  const payload = {
    id: user.id,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10d" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  const loggedUser = await AuthService.findUserByIdAndUpdate({
    id: user.id,
    updateData: { accessToken, refreshToken },
  });

  if (!loggedUser) {
    throw createError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Auth error",
    });
  }

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({
    email,
    _id: user.id,
    accessToken,
  });
}
async function logoutUser(req, res) {
  const { _id } = req.user;

  res.clearCookie("refreshToken");

  const unloggedUser = await AuthService.findByIdAndUpdate(_id, {
    token: "",
    refreshToken: "",
  });

  if (!unloggedUser) {
    throw createError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: AuthMessages.LOG_OUT_ERROR,
    });
  }
  res.status(200).json({
    message: AuthMessages.LOG_OUT_SUCCESS,
  });
}
async function refreshToken(req, res) {
  const { _id } = req.user;

  const user = await AuthService.findUserById(_id);

  if (!user) {
    throw createError({ status: 401, message: "Not authorized" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10d" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  await AuthService.findUserByIdAndUpdate(user._id, {
    token,
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
  });

  res.status(200).json({
    email: user?.email,
    _id,
    token,
  });
}
async function registerUser(req, res) {
  const { password, email } = req.body;

  const result = await AuthService.registerUser({ password, email });

  // const message = {
  //   to: email,
  //   subject: "Email verification",
  //   html: `<a href="${BASE_URL}/api/users/verify/${result.verificationToken}">Click to verify your email</a>`,
  // };

  // await sendSgEmail(message);

  res.status(201).json({
    message: "User created successfully",
    data: {
      email: result.email,
      role: result.role,
    },
  });
}
const AuthController = {
  getCurrentUser,
  getCurrentUserInfo,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
};
module.exports = AuthController;

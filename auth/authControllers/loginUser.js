const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("../auth.service");
// const cookieParser = require("cookie-parser");

const { createError, HttpStatus } = require("../../helpers");

const { JWT_SECRET_KEY } = process.env;
const { JWT_REFRESH_SECRET_KEY } = process.env;

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
module.exports = loginUser;

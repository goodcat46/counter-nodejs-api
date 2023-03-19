// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("../auth.service");
// const cookieParser = require("cookie-parser");

const { createError } = require("../../helpers");

const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

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

module.exports = refreshToken;

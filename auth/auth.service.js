const UserModel = require("./auth.model");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const createError = require("../helpers/createError");
const jwt = require("jsonwebtoken");
const AuthMessages = require("./auth.messages");

const { HttpStatus } = require("../helpers");
const { JWT_SECRET_KEY } = process.env;

async function findUserById(id) {
  return UserModel.findById(id);
}

async function registerUser(dto) {
  const { password, email } = dto;

  const user = await findOneUser({ email });

  if (user) {
    throw createError({ status: 409, message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = randomUUID();

  return UserModel.create({
    password: hashPassword,
    email,
    verificationToken,
  });
}

async function findUserByIdAndUpdate(id, updateData) {
  return UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

async function findOneUser(dto) {
  return UserModel.findOne(dto);
}

async function UserCheckByToken(req, _res, next) {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError({ status: HttpStatus.UNAUTHORIZED, message: null });
    }

    const { id, role, status } = jwt.verify(token, JWT_SECRET_KEY);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
      throw createError({ status: HttpStatus.UNAUTHORIZED, message: null });
    }

    return { canActive: true, id, role, status, user };
  } catch (error) {
    if (!error.status) {
      error.status = HttpStatus.UNAUTHORIZED;
      error.message = AuthMessages.NOT_FOUND_USER;
    }

    next(error);
  }
}

module.exports = {
  findUserById,
  findUserByIdAndUpdate,
  findOneUser,
  registerUser,
  UserCheckByToken,
};
// 1FDK7xRFHUN8Gc1o

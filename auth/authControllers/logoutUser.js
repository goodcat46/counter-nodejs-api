const UserModel = require("../auth.model");
const { HttpStatus, createError } = require("../../helpers");
const AuthMessages = require("../auth.messages");

async function logoutUser(req, res) {
  const { _id } = req.user;

  res.clearCookie("refreshToken");

  const unloggedUser = await UserModel.findByIdAndUpdate(_id, {
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

module.exports = logoutUser;

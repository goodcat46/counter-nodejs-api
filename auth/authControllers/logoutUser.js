const UserModel = require("../auth.model");

async function logoutUser(req, res) {
  const { _id } = req.user;

  res.clearCookie("refreshToken");

  await UserModel.findByIdAndUpdate(_id, { token: "", refreshToken: "" });

  res.status(204).json({
    message: "No Content",
  });
}

module.exports = logoutUser;

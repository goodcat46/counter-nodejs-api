const { createError } = require("../../helpers");
const UserModel = require("../auth.model");

async function verify(req, res) {
  const { verificationToken } = req.params;

  const user = await UserModel.findOne({ verificationToken });

  if (!user) {
    throw createError({
      status: 404,
      message: "User not found or already verified",
    });
  }

  await UserModel.findByIdAndUpdate(user._id, {
    status: true,
    verificationToken: "",
  });

  res.status(200).json({ message: "Verification successful" });
}

module.exports = verify;

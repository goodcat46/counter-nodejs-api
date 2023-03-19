const AuthServise = require("../auth.service");
const AuthMessages = require("../auth.messages");

async function getCurrentUserInfo(req, res) {
  const { email, _id } = req.user;

  const currentUserInfo = await AuthServise.findUserByEmail(email);

  res.json({
    message: AuthMessages.CURRENT_USER_INFO,
    email,
    _id,
    currentUserInfo,
  });
}

module.exports = getCurrentUserInfo;

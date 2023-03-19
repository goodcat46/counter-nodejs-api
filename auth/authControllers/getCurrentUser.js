async function getCurrentUser(req, res) {
  const { _id, email } = req.user;

  res.json({
    email,
    _id,
  });
}

module.exports = getCurrentUser;

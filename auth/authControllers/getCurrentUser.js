async function getCurrentUser(req, res) {
  const { role, email } = req.user;

  res.json({
    email,
    role,
  });
}

module.exports = getCurrentUser;

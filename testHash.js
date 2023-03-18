const bcrypt = require("bcryptjs");
const { discriminator } = require("./models/users");

async function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);

  const result = await bcrypt.hash(password, 10);

  const isPasswordsEqual = await bcrypt.compare("12345678", result);
}

hashPassword("12345678");

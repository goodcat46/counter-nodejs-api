const UsersService = require("../auth.service");
const sendSgEmail = require("../../helpers/sendSgEmail");

const { BASE_URL } = process.env;

async function registerUser(req, res) {
  const { password, email, role } = req.body;

  const result = await UsersService.registerUser({ password, email, role });

  const message = {
    to: email,
    subject: "Email verification",
    html: `<a href="${BASE_URL}/api/users/verify/${result.verificationToken}">Click to verify your email</a>`,
  };

  await sendSgEmail(message);

  res.status(201).json({
    message: "User created successfully",
    data: {
      email: result.email,
      role: result.role,
    },
  });
}

// async function registerUser(req, res) {
//   const { password, email, role } = req.body;

//   const user = await UserModel.findOne({ email });

//   if (user) {
//     throw createError({ status: 409, message: "Email in use" });
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   const verificationToken = randomUUID();

//   const result = await UserModel.create({
//     password: hashPassword,
//     email,
//     role,
//     verificationToken,
//   });

//   const message = {
//     to: email,
//     subject: "Email verification",
//     html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
//   };

//   await sendSgEmail(message);

//   res.status(201).json({
//     email: result.email,
//     password: result.password,
//     role: result.role,
//   });
// }

module.exports = registerUser;

const { Schema, model } = require("mongoose");
const emailRegexp = require("../helpers/validateEmail");
const { AUTH_MODEL_NAME, AUTH_COLLECTION_NAME } = require("./auth.constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    passwordHash: {
      type: String,
      minlength: 8,
      required: [true, "Set password for user"],
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model(AUTH_MODEL_NAME, userSchema, AUTH_COLLECTION_NAME);

module.exports = UserModel;

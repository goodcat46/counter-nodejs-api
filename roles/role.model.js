const { Schema, model } = require("mongoose");
const { ROLE_MODEL_NAME } = require("./roles.constants");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    actions: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
      default: [],
    },
    descr: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const RoleModel = model(ROLE_MODEL_NAME, roleSchema);

module.exports = RoleModel;

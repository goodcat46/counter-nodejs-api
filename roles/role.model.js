const { Schema, model } = require("mongoose");
const { ROLE_MODEL_NAME } = require("./roles.constants");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
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
const createRoleModel = (companyId) =>
  companyId
    ? model(ROLE_MODEL_NAME, roleSchema, `${ROLE_MODEL_NAME}s_${companyId}`)
    : model(ROLE_MODEL_NAME, roleSchema);

module.exports = createRoleModel;

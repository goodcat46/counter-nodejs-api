const { Schema, model, models } = require("mongoose");
const {
  getRoleModelName,
  getRoleCollectionName,
} = require("./roles.constants");

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
          // unique: true,
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

const createRoleModel = (companyId) => {
  if (models[getRoleModelName(companyId)]) {
    return models[getRoleModelName(companyId)];
  }
  const Model = model(
    getRoleModelName(companyId),
    roleSchema,
    getRoleCollectionName(companyId)
  );

  return Model;
};
module.exports = { createRoleModel };

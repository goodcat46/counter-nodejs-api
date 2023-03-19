const { Schema, model, models } = require("mongoose");
const { ROLE_MODEL_NAME, getRoleModelName } = require("./roles.constants");

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

const createRoleModel = (companyId) => {
  if (models[ROLE_MODEL_NAME]) {
    console.log("mongoose.models", { models });
  }
  const Model = model(getRoleModelName(companyId), roleSchema);

  console.log({ Model, models });

  return Model;
};
module.exports = createRoleModel;

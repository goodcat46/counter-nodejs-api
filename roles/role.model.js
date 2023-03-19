const { Schema, model, models, deleteModel } = require("mongoose");
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

const createRoleModel = (companyId) => {
  if (models[ROLE_MODEL_NAME]) {
    console.log("mongoose.models", { models });
    deleteModel(ROLE_MODEL_NAME);
  }
  const Model = model(ROLE_MODEL_NAME, roleSchema);

  console.log({ Model, models });

  return Model;
};
module.exports = createRoleModel;

const { Schema, model, SchemaTypes, models } = require("mongoose");
const {
  COUNT_TYPE_ENUM,
  COUNT_MODEL_NAME,
  COUNT_COLLECTION_NAME,
} = require("./counts.constants");

const getCountModelName = (companyId) => `${companyId}_${COUNT_MODEL_NAME}`;
const getCountsCollectionName = (companyId) =>
  `${companyId}_${COUNT_COLLECTION_NAME}`;

const createCountSchema = (companyId) =>
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
      },
      owner: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: getCountModelName(companyId),
      },
      type: {
        type: String,
        enum: COUNT_TYPE_ENUM,
        required: [
          true,
          `Type is required / type one of: ${COUNT_TYPE_ENUM.join(", ")}`,
        ],
      },
      code: {
        type: String,
        required: [true, `Code is required`],
        unique: true,
      },
      descr: {
        type: String,
      },
      balance: {
        type: Number,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
const createCountModel = (companyId) => {
  if (models[getCountModelName(companyId)]) {
    return models[getCountModelName(companyId)];
  }
  const Model = model(
    getCountModelName(companyId),
    createCountSchema(companyId),
    getCountsCollectionName(companyId)
  );

  return Model;
};

const CountModel = {
  create: createCountModel,
  getModelName: getCountModelName,
  getCollectionName: getCountsCollectionName,
};
module.exports = CountModel;

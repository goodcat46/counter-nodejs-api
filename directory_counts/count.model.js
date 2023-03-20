const { Schema, model, SchemaTypes, models } = require("mongoose");
const {
  countTypeEnum,
  getCountModelName,
  getCountsCollectionName,
} = require("./counts.constants");
const { AUTH_MODEL_NAME } = require("../auth/auth.constants");
//!   { _id: 5, name: '', owner: '', type: '', code: '', descr: '' },

const CountSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      default: null,
      ref: AUTH_MODEL_NAME,
    },
    type: {
      type: String,
      enum: countTypeEnum,
      required: [true, `Type is required / type one of: ${countTypeEnum}`],
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
    CountSchema,
    getCountsCollectionName(companyId)
  );

  return Model;
};

module.exports = { createCountModel, getCountModelName };

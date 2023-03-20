const { Schema, model, SchemaTypes } = require("mongoose");
const { countTypeEnum, COUNT_MODEL_NAME } = require("./counts.constants");
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
      ref: COUNT_MODEL_NAME,
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

const CountModel = model(COUNT_MODEL_NAME, CountSchema);

module.exports = CountModel;

const { Schema, model, SchemaTypes } = require("mongoose");
const {
  categoryTypeEnum,
  CATEGORY_MODEL_NAME,
} = require("./categories.constants");
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
      ref: CATEGORY_MODEL_NAME,
    },
    type: {
      type: String,
      enum: categoryTypeEnum,
      required: [true, `Type is required / type one of: ${categoryTypeEnum}`],
    },
    descr: {
      type: String,
      default: null,
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

const CountModel = model(CATEGORY_MODEL_NAME, CountSchema);

module.exports = CountModel;

const { Schema, model, SchemaTypes } = require("mongoose");
const { AUTH_MODEL_NAME } = require("../auth/auth.constants");
const { COMPANY_MODEL_NAME } = require("./companies.constants");
const companiesMessages = require("./companies.messages");

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, companiesMessages.NAME_IS_REQUIRED],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      default: null,
      ref: AUTH_MODEL_NAME,
      // required: [true, companiesMessages.OWNER_IS_REQUIRED],
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

const CompanyModel = model(COMPANY_MODEL_NAME, companySchema);

module.exports = { CompanyModel };

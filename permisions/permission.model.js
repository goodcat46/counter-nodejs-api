const { Schema, model, SchemaTypes, models } = require("mongoose");

const { AUTH_MODEL_NAME } = require("../auth/auth.constants");
const { COMPANY_MODEL_NAME } = require("../companies/companies.constants");
const { getRoleModelName } = require("../roles/roles.constants");

const {
  PERMISSION_STATUS_ENUM,
  getPermissionModelName,
  PERMISSIONS_COLLECTION_NAME,
} = require("./permissions.constants");

const permissionsMessages = require("./permissions.messages");

const createPermissionSchema = (companyId) =>
  new Schema(
    {
      company: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: COMPANY_MODEL_NAME,
        required: [true, permissionsMessages.MISSING_PARAMS(["company"])],
      },
      user: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: AUTH_MODEL_NAME,
        required: [true, permissionsMessages.MISSING_PARAMS(["user"])],
      },
      role: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: companyId && getRoleModelName(companyId),
        required: [true, permissionsMessages.MISSING_PARAMS(["role"])],
      },
      status: {
        type: String,
        default: PERMISSION_STATUS_ENUM[0],
        enum: PERMISSION_STATUS_ENUM,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

const createPermissionModel = (companyId) => {
  if (models[getPermissionModelName(companyId)]) {
    return models[getPermissionModelName(companyId)];
  }
  const Model = model(
    getPermissionModelName(companyId),
    createPermissionSchema(companyId),
    PERMISSIONS_COLLECTION_NAME
  );

  return Model;
};

module.exports = { createPermissionModel };

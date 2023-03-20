const { Schema, model, SchemaTypes, models } = require("mongoose");

const { AUTH_MODEL_NAME } = require("../auth/auth.constants");
const { COMPANY_MODEL_NAME } = require("../companies/companies.constants");
const { RoleModel } = require("../roles");
const permissionsMessages = require("./permissions.messages");
const {
  PERMISSION_STATUS_ENUM,
  PERMISSIONS_COLLECTION_NAME,
  PERMISSION_MODEL_NAME,
} = require("./permissions.constants");

const getPermissionModelName = (companyId) =>
  `${companyId}_${PERMISSION_MODEL_NAME}`;
const getPermissionCollectionName = (companyId) =>
  `${companyId}_${PERMISSIONS_COLLECTION_NAME}`;
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
        ref: companyId && RoleModel.getModelName(companyId),
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

function createPermissionModel(companyId) {
  if (models[getPermissionModelName(companyId)]) {
    return models[getPermissionModelName(companyId)];
  }
  const Model = model(
    getPermissionModelName(companyId),
    createPermissionSchema(companyId),
    PERMISSIONS_COLLECTION_NAME
  );

  return Model;
}

const PermissionModel = {
  create: createPermissionModel,
  getModelName: getPermissionModelName,
  getCollectionName: getPermissionCollectionName,
  createPermissionModel,
  getPermissionModelName,
  getPermissionCollectionName,
};
module.exports = PermissionModel;

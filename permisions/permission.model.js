const { Schema, model, SchemaTypes } = require("mongoose");
const { USER_MODEL_NAME } = require("../auth/auth.constants");
const { COMPANY_MODEL_NAME } = require("../companies/companies.constants");
const { ROLE_MODEL_NAME } = require("../roles/roles.constants");
const { PERMISSION_MODEL_NAME } = require("./permissions.constants");

const permissionsMessages = require("./permissions.messages");

// const permissionSchema = new Schema(
//   {
//     company: {
//       type: SchemaTypes.ObjectId,
//       default: null,
//       ref: COMPANY_MODEL_NAME,
//       required: [true, permissionsMessages.MISSING_PARAMS(["company"])],
//     },
//     user: {
//       type: SchemaTypes.ObjectId,
//       default: null,
//       ref: USER_MODEL_NAME,
//       required: [true, permissionsMessages.MISSING_PARAMS(["user"])],
//     },
//     role: {
//       type: SchemaTypes.ObjectId,
//       default: null,
//       ref: ROLE_MODEL_NAME,
//       required: [true, permissionsMessages.MISSING_PARAMS(["role"])],
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );
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
        ref: USER_MODEL_NAME,
        required: [true, permissionsMessages.MISSING_PARAMS(["user"])],
      },
      role: {
        type: SchemaTypes.ObjectId,
        default: null,
        ref: companyId ? `${ROLE_MODEL_NAME}s_${companyId}` : ROLE_MODEL_NAME,
        required: [true, permissionsMessages.MISSING_PARAMS(["role"])],
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

// const PermissionModel = model(PERMISSION_MODEL_NAME, permissionSchema);
const createPermissionModel = (companyId) =>
  model(PERMISSION_MODEL_NAME, createPermissionSchema(companyId));

module.exports = { createPermissionModel };

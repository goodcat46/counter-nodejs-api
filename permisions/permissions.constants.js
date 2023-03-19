const PERMISSION_MODEL_NAME = "permission";
const PERMISSIONS_COLLECTION_NAME = "permissions";
const getPermissionModelName = (companyId) =>
  `${PERMISSION_MODEL_NAME}_${companyId}`;
const PENDING = `PENDING`;
const REJECTED = `REJECTED`;
const ACCEPTED = `ACCEPTED`;

const PERMISSION_STATUS_ENUM = [PENDING, REJECTED, ACCEPTED];

module.exports = {
  PERMISSION_MODEL_NAME,
  PERMISSION_STATUS_ENUM,
  PERMISSIONS_COLLECTION_NAME,
  getPermissionModelName,
};

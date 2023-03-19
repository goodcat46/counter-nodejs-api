const ROLE_MODEL_NAME = "role";
const getRoleModelName = (companyId) => `${ROLE_MODEL_NAME}_${companyId}`;
const getRoleCollectionName = (companyId) => `roles_${companyId}`;
module.exports = {
  ROLE_MODEL_NAME,
  getRoleModelName,
  getRoleCollectionName,
};

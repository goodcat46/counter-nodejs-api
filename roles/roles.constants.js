const ROLE_MODEL_NAME = "role";
const getRoleModelName = (companyId) => `${companyId}_${ROLE_MODEL_NAME}`;
const getRoleCollectionName = (companyId) => `${companyId}_roles`;
module.exports = {
  ROLE_MODEL_NAME,
  getRoleModelName,
  getRoleCollectionName,
};

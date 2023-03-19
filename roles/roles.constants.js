const ROLE_MODEL_NAME = "role";
const getRoleModelName = (companyId) => `${ROLE_MODEL_NAME}_${companyId}`;
module.exports = {
  ROLE_MODEL_NAME,
  getRoleModelName,
};

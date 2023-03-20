const ACTIVE = "ACTIVE";
const PASSIVE = "PASSIVE";
const COUNT_MODEL_NAME = "count";
const getCountModelName = (companyId) => `${COUNT_MODEL_NAME}_${companyId}`;
const getCountsCollectionName = (companyId) => `counts_${companyId}`;

const countTypeEnum = [ACTIVE, PASSIVE];

module.exports = {
  countTypeEnum,
  COUNT_MODEL_NAME,
  getCountModelName,
  getCountsCollectionName,
};

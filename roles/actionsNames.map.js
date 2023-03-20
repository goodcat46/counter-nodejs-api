const { transactionsActionsMap, tractionsMap } = require("../transactions");
const { categoriesActionsMap } = require("../directory_categories");

const apiActions = [
  ...categoriesActionsMap,
  ...transactionsActionsMap,
  tractionsMap,
];
// console.log("apiActions", apiActions);
module.exports = { apiActions };

const { transactionsActionsMap, tractionsMap } = require("../transactions");
const { categoriesActionsMap } = require("../directories/categories");

const apiActions = [
  ...categoriesActionsMap,
  ...transactionsActionsMap,
  tractionsMap,
];
// console.log("apiActions", apiActions);
module.exports = { apiActions };

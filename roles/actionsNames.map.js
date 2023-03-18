const { transactionsActionsMap } = require("../transactions");
const { categoriesActionsMap } = require("../directories/categories");

const apiActions = [...transactionsActionsMap, ...categoriesActionsMap];

module.exports = { apiActions };

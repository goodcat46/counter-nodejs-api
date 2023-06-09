const TransactionControllers = require("./transactions.controller");

const transactionsActionsMap = [
  // {
  //   name: TransactionControllers.getAll.name,
  //   title: "",
  //   descr: "Get all transactions withou filters",
  // },
  // {
  //   name: TransactionControllers.createTransaction.name,
  //   title: "",
  //   descr: "For creating transactions",
  // },
  // {
  //   name: TransactionControllers.createManyTransactions.name,
  //   title: "",
  //   descr: "For creating array of transactions",
  // },
  // {
  //   name: TransactionControllers.deleteTransactionById.name,
  //   title: "",
  //   descr: "For deleting transactions",
  // },
  // {
  //   name: TransactionControllers.deleteManyTrById.name,
  //   title: "",
  //   descr: "For deleting array of transactions",
  // },
];
const tractionsMap = {
  getAll: {
    name: "getAllTransactions",
    title: "Отримати усі транзакції",
    descr:
      "Дозволяє отримати усі транзакції. Має бути захищеним та передати транзакції певної організації",
    controller: TransactionControllers.getAllTransactions,
  },
};

module.exports = { transactionsActionsMap, tractionsMap };

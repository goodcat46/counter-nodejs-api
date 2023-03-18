const TransactionControllers = require("./transactionControllers");

const transactionsActionsMap = [
  {
    name: TransactionControllers.getAll.name,
    title: "",
    descr: "Get all transactions withou filters",
  },
  {
    name: TransactionControllers.createTransaction.name,
    title: "",
    descr: "For creating transactions",
  },
  {
    name: TransactionControllers.createManyTransactions.name,
    title: "",
    descr: "For creating array of transactions",
  },
  {
    name: TransactionControllers.deleteTransactionById.name,
    title: "",
    descr: "For deleting transactions",
  },
  {
    name: TransactionControllers.deleteManyTrById.name,
    title: "",
    descr: "For deleting array of transactions",
  },
];
const tractionsMap = {
  getAll: {
    name: "getAllTransactions",
    title: "Отримати усі транзакції",
    descr:
      "Дозволяє отримати усі транзакції. Має бути захищеним та передати транзакції певної організації",
    controller: TransactionControllers.getAll,
  },
};

console.log(tractionsMap);

module.exports = transactionsActionsMap;

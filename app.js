const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { AuthsRouter } = require("./auth");
const { RolesRouter } = require("./roles");
const { TransactionsRouter } = require("./transactions");
const { CountsModule, CategoriesModule } = require("./directories");
// console.log(CountsModule);

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// app.use(
//   "/api/",
//   express.Router().get("/", (req, res) => {
//     console.log(req);
//     res.status(200).json({ message: "Hello" });
//   })
// );
app.use("/api/users", AuthsRouter);
app.use("/api/roles", RolesRouter);
app.use("/api/transactions", TransactionsRouter);
app.use("/api/directories/counts", CountsModule.CountsRouter);
app.use("/api/directories/categories", CategoriesModule.CategoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

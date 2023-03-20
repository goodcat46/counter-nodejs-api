const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = require("./middlewares");

const AuthModule = require("./auth");
const { CompaniesRouter } = require("./companies");
const { RolesRouter, RoleModel } = require("./roles");
const { TransactionsRouter, TransactionModel } = require("./transactions");
const { PermissionsRouter, PermissionModel } = require("./permisions");
const CountsModule = require("./directory_counts");
const CategoriesModule = require("./directory_categories");
const mongoose = require("mongoose");

// console.log(middlewares);

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  middlewares.modelsInitializer([TransactionModel, RoleModel, PermissionModel])
);
app.use((req, _res, next) => {
  console.log("req", { params: req.params, query: req.query, body: req.body });
  console.log("mongoose modelNames", mongoose.modelNames());
  next();
});

// app.use(
//   "/api/",
//   express.Router().get("/", (req, res) => {
//     console.log({ params: req.params, query: req.query, body: req.body });
//     res.status(200).json({ message: "Hello" });
//   })
// );

app.use("/api/auth", AuthModule.AuthRouter);
app.use("/api/companies", CompaniesRouter);
app.use("/api/:companyId/roles", (req, res, next) => {
  console.log({ params: req.params, query: req.query });
  return RolesRouter(req, res, next);
});
app.use("/api/:companyId/permissions", PermissionsRouter);
app.use("/api/:companyId/transactions", TransactionsRouter);
app.use("/api/:companyId/directories/counts", CountsModule.CountsRouter);
app.use(
  "/api/:companyId/directories/categories",
  CategoriesModule.CategoriesRouter
);

app.use("/api/:companyId/test", function (req, res, next) {
  console.log("Request Id:", req.params.companyId);
  res.status(200).json({
    route: `Request companyId: ${req.params.companyId}`,
    params: req.params.companyId,
  });
  next();
});

app.use((_req, res, _next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

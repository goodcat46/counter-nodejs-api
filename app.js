const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { AuthsRouter } = require("./auth");
const { RolesRouter } = require("./roles");
const { TransactionsRouter } = require("./transactions");
const { CompaniesRouter } = require("./companies");
const { CountsModule, CategoriesModule } = require("./directories");
const { PermissionsRouter } = require("./permisions");

// console.log(CountsModule);

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req);
  console.log("mongoose.models APP", mongoose.models);
  next();
});

app.use(
  "/api/",
  express.Router().get("/", (req, res) => {
    console.log(req.params);
    res.status(200).json({ message: "Hello" });
  })
);
app.use("/api/auth", AuthsRouter);
app.use("/api/:companyId/roles", RolesRouter);
app.use("/api/:companyId/transactions", TransactionsRouter);
app.use("/api/:companyId/companies", CompaniesRouter);
app.use("/api/:companyId/directories/counts", CountsModule.CountsRouter);
app.use(
  "/api/:companyId/directories/categories",
  CategoriesModule.CategoriesRouter
);
app.use("/api/:companyId/permissions", PermissionsRouter);

app.use("/api/:companyId/test", function (req, res, next) {
  console.log("Request Id:", req.params);
  res.status(200).json({
    route: `Request companyId: ${req.params.companyId}`,
    params: req.params.companyId,
  });
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

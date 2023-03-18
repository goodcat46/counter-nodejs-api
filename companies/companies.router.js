const express = require("express");
const CompaniesRouter = express.Router();
const CompaniesControllers = require("./companies.controller");
const { controllerWrapper } = require("../helpers");
const { validateBody } = require("../middlewares");
// const authenticate = require("../middlewares/authenticate");
const CompanyDto = require("./company.dto");

CompaniesRouter.get(
  "/getAll",
  // authenticate,
  controllerWrapper(CompaniesControllers.getAllCompanies)
);

CompaniesRouter.post(
  "/create",
  // authenticate,
  validateBody(CompanyDto.createCompanyDto),
  controllerWrapper(CompaniesControllers.createCompany)
);

module.exports = CompaniesRouter;

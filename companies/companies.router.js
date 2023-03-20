const express = require("express");
const CompaniesRouter = express.Router();
const CompaniesControllers = require("./companies.controller");
const { controllerWrapper } = require("../helpers");
const { validateBody, authenticate } = require("../middlewares");
const CompanyDto = require("./company.dto");

CompaniesRouter.use(authenticate);

CompaniesRouter.get(
  "/getAll",
  controllerWrapper(CompaniesControllers.getAllCompanies)
);

CompaniesRouter.post(
  "/create",
  validateBody(CompanyDto.createCompanyDto),
  controllerWrapper(CompaniesControllers.createCompany)
);

module.exports = CompaniesRouter;

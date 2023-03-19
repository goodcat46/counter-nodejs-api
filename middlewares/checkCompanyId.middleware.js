const mongoose = require("mongoose");
const createError = require("../helpers/createError");
const CompaniesService = require("../companies/companies.service");
const CompaniesMessages = require("../companies/companies.messages");
const { HttpStatus } = require("../helpers");

async function checkCompanyId(req, res, next) {
  try {
    const [companyId] = req.baseUrl.replace("/api/", "").split("/");

    if (!mongoose.isValidObjectId(companyId)) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: CompaniesMessages.ID_IS_NOT_VALID,
      });
    }

    const company = await CompaniesService.findCompanyById({ id: companyId });

    if (!company) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: CompaniesMessages.NOT_FOUND,
      });
    }

    req.company = company;

    // res.status(200).json({ company });
    next();
  } catch (error) {
    if (!error.status) {
      console.log(error);
      error.status = 401;
      error.message = "checkCompanyId error";
    }

    next(error);
  }
}

module.exports = checkCompanyId;

const createError = require("../helpers/createError");
const CompaniesService = require("../companies/companies.service");
const CompaniesMessages = require("../companies/companies.messages");
const { HttpStatus } = require("../helpers");

async function checkCompanyId(req, res, next) {
  try {
    const [companyId] = req.baseUrl.replace("/api/", "").split("/");

    const company = await CompaniesService.findCompanyById(companyId);
    console.log(company);

    if (!company) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: CompaniesMessages.FOUND_RESULT_ERROR(0),
      });
    }

    req.company = company;

    // res.status(200).json({ company });
    next();
  } catch (error) {
    if (!error.status) {
      console.log(error);
      error.status = 401;
      error.message = "Company not found";
    }

    next(error);
  }
}

module.exports = checkCompanyId;

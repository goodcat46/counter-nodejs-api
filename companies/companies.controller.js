const { createError, HttpStatus } = require("../helpers");
const companiesMessages = require("./companies.messages");

const CompaniesService = require("./companies.service");

async function createCompany(req, res) {
  const user = req?.user;
  const { name, descr } = req.body;

  const newData = {
    name,
    owner: user?._id,
    descr,
  };

  const createdCompany = await CompaniesService.createCompany({ newData });

  if (!createdCompany) {
    throw createError({
      status: HttpStatus.BAD_REQUEST,
      message: companiesMessages.CREATE_ERROR,
    });
  }

  res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    message: companiesMessages.CREATE_SUCCESS,
    data: createdCompany,
  });
}
async function getAllCompanies(_req, res) {
  const allCompanies = await CompaniesService.getAllCompanies();

  if (allCompanies.length === 0) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: companiesMessages.FOUND_RESULT_ERROR(allCompanies.length),
    });
  }

  res.status(HttpStatus.CREATED).json({
    message: companiesMessages.FOUND_RESULT_SUCCESS(allCompanies.length),
    data: allCompanies,
  });
}

module.exports = {
  createCompany,
  getAllCompanies,
};

const { CompanyModel } = require("./company.model");

async function getAllCompanies() {
  return CompanyModel.find();
}
async function findCompanyById({ id }) {
  return CompanyModel.findById(id);
}
async function findCompanyByName({ name }) {
  return CompanyModel.findOne(name);
}
async function createCompany({ newData }) {
  return CompanyModel.create(newData);
}
async function deleteCompanyById({ id }) {
  return CompanyModel.findByIdAndDelete(id);
}
async function updateCompanyById(id, updateData) {
  return CompanyModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
}

module.exports = {
  getAllCompanies,
  findCompanyById,
  findCompanyByName,
  createCompany,
  deleteCompanyById,
  updateCompanyById,
};

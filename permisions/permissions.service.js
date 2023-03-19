const {
  PermissionModel,
  createPermissionModel,
} = require("./permission.model");

async function getAllPermissions() {
  return PermissionModel.find();
}
async function createPermission({ companyId, newPermission }) {
  console.log("service createPermission", newPermission);
  const Model = createPermissionModel(companyId);
  return Model.create(newPermission);
}
// async function findCompanyById(id) {
//   return CompanyModel.findById(id);
// }
// async function findCompanyByName(name) {
//   return CompanyModel.findOne(name);
// }
// async function deleteCompanyById(id) {
//   return CompanyModel.findByIdAndDelete(id);
// }
// async function updateCompanyById(id, updateData) {
//   return CompanyModel.findByIdAndUpdate(id, updateData, {
//     new: true,
//   });
// }

module.exports = {
  getAllPermissions,
  // findCompanyById,
  // findCompanyByName,
  createPermission,
  // deleteCompanyById,
  // updateCompanyById,
};

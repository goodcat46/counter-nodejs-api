const CountsService = require("./counts.service");
const CountsMessages = require("./counts.messages");
const { createError, HttpStatus } = require("../helpers");

async function createCount(req, res) {
  const newCount = req.body;
  const companyId = req?.company?._id;

  const createdCount = await CountsService.createCount({ newCount, companyId });

  if (!createdCount) {
    throw createError({
      status: HttpStatus.NOT_FOUND,
      message: CountsMessages.CREATING_ERROR,
    });
  }

  res.status(201).json({
    message: CountsMessages.CREATING_SUCCESS,
    data: createdCount,
  });
}

async function deleteCountById(req, res) {
  const { id } = req.params;
  const companyId = req?.company?._id;

  const deletedDoc = await CountsService.deleteCountById({ id, companyId });

  if (!deletedDoc) {
    throw createError({ status: 404, message: CountsMessages.DELETING_ERROR });
  }

  res.status(200).json({
    message: CountsMessages.DELETING_SUCCESS,
    data: deletedDoc,
  });
}

async function updateCountById(req, res) {
  const { body } = req;
  const { id } = req.params;
  const companyId = req?.company?._id;

  const updatedDoc = await CountsService.updateCountById({
    id,
    updteData: body,
    companyId,
  });

  if (!updatedDoc) {
    throw createError({ status: 404, message: CountsMessages.UPDATING_ERROR });
  }

  res.status(200).json({
    message: CountsMessages.UPDATING_SUCCESS,
    data: updatedDoc,
  });
}

async function getAllCounts(req, res) {
  const companyId = req?.company?._id;
  const allCounts = await CountsService.getAllCounts({ companyId });

  if (allCounts.length === 0) {
    throw createError({ status: 404, message: CountsMessages.NOT_FOUND_ITEMS });
  }

  res.status(201).json({
    message: CountsMessages.FOUND_ITEMS,
    data: allCounts,
  });
}

const CountsController = {
  createCount,
  getAllCounts,
  deleteCountById,
  updateCountById,
};

module.exports = CountsController;

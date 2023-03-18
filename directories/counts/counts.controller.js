const CountsService = require("./counts.service");
const CountsMessages = require("./counts.messages");
const { createError, HttpStatus } = require("../../helpers");

async function createCount(req, res) {
  const newCount = req.body;

  const createdCount = await CountsService.createCount(newCount);

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

  const deletedDoc = await CountsService.deleteCountById(id);

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

  const updatedDoc = await CountsService.updateCountById(id, body);

  if (!updatedDoc) {
    throw createError({ status: 404, message: CountsMessages.UPDATING_ERROR });
  }

  res.status(200).json({
    message: CountsMessages.UPDATING_SUCCESS,
    data: updatedDoc,
  });
}

async function getAllCounts(_req, res) {
  const allCounts = await CountsService.getAllCounts();

  if (allCounts.length === 0) {
    throw createError({ status: 404, message: CountsMessages.NOT_FOUND_ITEMS });
  }

  res.status(201).json({
    message: CountsMessages.FOUND_ITEMS,
    data: allCounts,
  });
}

module.exports = {
  createCount,
  getAllCounts,
  deleteCountById,
  updateCountById,
};

const express = require("express");
const { controllerWrapper } = require("../helpers");
const {
  validateBody,
  authenticate,
  checkCompanyId,
} = require("../middlewares");
const CountDto = require("./count.dto");
const CountController = require("./counts.controller");

const CountsRouter = express.Router();

CountsRouter.use(authenticate);
CountsRouter.use(checkCompanyId);

CountsRouter.get("/getAll", controllerWrapper(CountController.getAllCounts));

CountsRouter.post(
  "/create",
  validateBody(CountDto.createCountDto),
  controllerWrapper(CountController.createCount)
);

CountsRouter.delete(
  "/delete/:id",
  controllerWrapper(CountController.deleteCountById)
);

CountsRouter.patch(
  "/update/:id",
  validateBody(CountDto.updateCountDto),
  controllerWrapper(CountController.updateCountById)
);

CountsRouter.patch(
  "/update/correctCountBalanse:id",
  validateBody(CountDto.correctCountBalanceDto),
  controllerWrapper(CountController.updateCountById)
);

module.exports = CountsRouter;

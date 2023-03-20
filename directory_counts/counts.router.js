const express = require("express");
const { controllerWrapper } = require("../helpers");
const {
  validateBody,
  authenticate,
  checkCompanyId,
} = require("../middlewares");
const CountDto = require("./count.dto");
const CountsController = require("./counts.controller");

const CountsRouter = express.Router();

CountsRouter.use(authenticate);
CountsRouter.use(checkCompanyId);

CountsRouter.get("/getAll", controllerWrapper(CountsController.getAllCounts));

CountsRouter.post(
  "/create",
  validateBody(CountDto.createCountDto),
  controllerWrapper(CountsController.createCount)
);

CountsRouter.delete(
  "/delete/:id",
  controllerWrapper(CountsController.deleteCountById)
);

CountsRouter.patch(
  "/update/:id",
  validateBody(CountDto.updateCountDto),
  controllerWrapper(CountsController.updateCountById)
);

CountsRouter.patch(
  "/update/correctCountBalanse:id",
  validateBody(CountDto.correctCountBalanceDto),
  controllerWrapper(CountsController.updateCountById)
);

module.exports = CountsRouter;

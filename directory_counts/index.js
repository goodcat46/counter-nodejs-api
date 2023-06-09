const CountModel = require("./count.model");
const CountsMessages = require("./counts.messages");
const CountsController = require("./counts.controller");
const CountsConstants = require("./counts.constants");
const CountsService = require("./counts.service");
const CountDto = require("./count.dto");
const CountsRouter = require("./counts.router");

const CountsModule = {
  CountModel,
  CountsMessages,
  CountsController,
  CountsConstants,
  CountsService,
  CountsRouter,
  CountDto,
};
module.exports = CountsModule;

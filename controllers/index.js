const express = require("express");

const router = express.Router();

const channelRouter = require("./channel");

module.exports = models => {
  router.use("/channels", channelRouter(models));

  return router;
};

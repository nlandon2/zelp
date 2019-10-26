const express = require("express");

const router = express.Router();

const restaurantRouter = require("./restaurant");

module.exports = models => {
  router.use("/restaurant", restaurantRouter(models));

  return router;
};

const express = require("express");

module.exports = models => {
  const create = (req, res) =>
    models.restaurants
      .create({
        business_id: req.body.business_id,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        stars: req.body.stars,
        is_open: req.body.is_open,
        categories: req.body.categories
      })
      .then(restaurants => res.status(201).json(restaurants.serialize()))
      .catch(err => res.status(400).send(err.message));

  const listRestaurants = (req, res) =>
    models.restaurant
      .list()
      .then(restaurants =>
        restaurants.map(restaurant => restaurant.serialize())
      )
      .then(restaurants => res.status(200).json(restaurants))
      .catch(err => res.status(400).send(err.message));

  const router = express.Router();
  router.post("", create);
  router.get("", listRestaurants);

  return router;
};

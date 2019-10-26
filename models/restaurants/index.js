const moment = require("moment");

const Restaurant = function(dbRestaurant) {
  this.business_id = dbRestaurant.business_id;
  this.name = dbRestaurant.name;
  this.city = dbRestaurant.city;
  this.state = dbRestaurant.state;
  this.stars = dbRestaurant.stars;
  this.categories = dbRestaurant.categories;
};

Restaurant.prototype.serialize = function() {
  return {
    business_id: this.business_id,
    name: this.name,
    city: this.city,
    state: this.state,
    stars: this.stars,
    categories: this.categories
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Restaurant),
    list: require("./list")(knex, Restaurant)
  };
};

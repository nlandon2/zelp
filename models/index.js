module.exports = function(knex) {
  return {
    restaurants: require("./restaurants")(knex)
  };
};

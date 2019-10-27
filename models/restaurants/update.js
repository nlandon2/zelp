module.exports = (knex, Restaurant) => {
  return params => {
    const restaurantId = params.business_id;
    const restaurantName = params.name;
    const restaurantCity = params.city;
    const restaurantState = params.state;
    const restaurantStars = params.stars;
    const restaurantCategories = params.categories;

    return knex("restaurants")
      .where({ business_id: restaurantId })
      .update({
        name: restaurantName,
        city: restaurantCity,
        state: restaurantState,
        stars: restaurantStars,
        categories: restaurantCategories
      })
      .then(() => {
        return knex("restaurants").select();
      })
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That restaurant already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};

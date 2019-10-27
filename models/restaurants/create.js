const validateName = name =>
  typeof name === "string" && name.replace(" ", "").length > 2;

module.exports = (knex, Restaurant) => {
  return params => {
    const restaurantId = params.business_id;
    const restaurantName = params.name;
    const restaurantCity = params.city;
    const restaurantState = params.state;
    const restaurantStars = params.stars;
    const restaurantCategories = params.categories;

    if (!validateName(restaurantName)) {
      return Promise.reject(
        new Error("Name must be provided, and be at least two characters")
      );
    }

    return knex("restaurants")
      .insert({
        business_id: restaurantId,
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
        return Promise.reject(err);
      });
  };
};

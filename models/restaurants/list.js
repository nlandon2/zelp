module.exports = (knex, Restaurant) => {
  return async () => {
    const restaurants = await knex("restaurants").select();
    const serializedRestaurants = [];

    for (const restaurant in restaurants) {
      const newRestaurant = new Restaurant(restaurants[restaurant]);
      serializedRestaurants.push(newRestaurant);
    }
    return serializedRestaurants;
  };
};

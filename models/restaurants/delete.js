module.exports = (knex, Restaurant) => {
  return params => {
    const restaurantId = params;

    return knex("restaurants")
      .where({ business_id: restaurantId })
      .del()
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

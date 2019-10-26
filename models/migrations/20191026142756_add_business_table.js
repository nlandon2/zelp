exports.up = function(knex) {
  return knex.schema.createTable("restaurants", t => {
    t.string("business_id", 100)
      .unique()
      .notNullable()
      .index();
    t.string("name", 100)
      .notNullable()
      .index();
    t.string("neighborhood", 100).index();
    t.string("address", 500).index();
    t.string("city", 100).index();
    t.string("state", 3).index();
    t.string("postal_code", 10).index();
    t.float("latitude").index();
    t.float("longitude").index();
    t.float("stars").index();
    t.integer("review_count").index();
    t.integer("is_open").index();
    t.string("categories", 1000).index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("restaurants");
};

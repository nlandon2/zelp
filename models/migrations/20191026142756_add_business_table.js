exports.up = function(knex) {
  return knex.schema.createTable("business", t => {
    t.string("business_id", 100)
      .unique()
      .notNullable()
      .index();
    t.string("name", 100)
      .unique()
      .notNullable()
      .index();
    t.string("city", 100).index();
    t.string("state", 3).index();
    t.integer("postal_code").index();
    t.float("latitude").index();
    t.float("longitude").index();
    t.float("stars").index();
    t.integer("review_count").index();
    t.binary("is_open").index();
    t.string("categories", 1000).index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("business");
};

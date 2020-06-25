
exports.up = function(knex) {
  return knex.schema
  .createTable('tallyweb.businesses', t => {
    t.string('business_id')
    t.string('address')
    t.string('zipcode')
    t.float('latitude')
    t.float('longitude')
    t.string('attrubutes')
    t.string('cuisine')
    t.integer('review_count')
    t.float('business_stars')
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists(tallyweb.businesses)
};

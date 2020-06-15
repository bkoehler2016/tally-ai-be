
exports.up = function(knex) {
    return knex.schema
        .createTable('tallyweb.gUsers_favorites', Fav => {
            Fav.increments();
            // Foreign Key: user_id
            Fav.integer('gUser_id')
                .unsigned()
                .references("id")
                .inTable("gUsers")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            // Foreign Key: business_id
            Fav.integer('business_id')
                .unsigned()
                .references("id")
                .inTable("businesses")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tallyweb.gUsers_favorites');
};

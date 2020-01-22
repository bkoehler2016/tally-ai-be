
exports.up = function (knex) {
    return knex.schema
        .createTable('users_favorites', Fav => {
            Fav.increments();
            // Foreign Key: user_id
            Fav.integer('user_id')
                .unsigned()
                .references("id")
                .inTable("users")
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

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_favorites');
};


exports.up = function(knex) {
    return knex.schema.createTable("tallyweb.testing_gUsers", gUser => {
        gUser.increments();
        gUser.string("google_id")
        .unique()
        .notNullable();
        gUser.string("first_name").notNullable();
        gUser.string("last_name").notNullable();
        gUser.string("email")
        .unique()
        .notNullable();
        gUser.json("preferences");
    })
    .createTable("tallyweb.testing_gUsers_businesses", gUsersBusinesses => {
        gUsersBusinesses.increments();
        // Foreign Key - references users
        gUsersBusinesses.string("gUser_id")
        .unsigned()
        .references("google_id")
        .inTable("testing_gUsers")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        // Foreign Key - references businesses
        gUsersBusinesses.integer("business_id")
        .unsigned()
        .references("id")
        .inTable("businesses")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("tallyweb.testing_gUsers")
    .dropTableIfExists("tallyweb.testing_gUsers")
};

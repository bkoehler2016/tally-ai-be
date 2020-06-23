
exports.up = function(knex) {
    return knex.schema
        .createTable("tallyweb.gUsers", gUser => {
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
        .createTable("tallyweb.gUsers_businesses", gUsersBusinesses => {
            gUsersBusinesses.increments();
            // Foreign Key - references users
            gUsersBusinesses.string("gUser_id")
            .unsigned()
            .references("google_id")
            .inTable("gUsers")
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
        .dropTableIfExists("tallyweb.gUsers")
        .dropTableIfExists("tallyweb.gUsers_businesses")
};

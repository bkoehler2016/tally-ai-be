exports.up = function(knex) {
  return knex.schema
    .createTable("tallyweb.users", Users => {
      Users.increments();
      Users.string("first_name").notNullable();
      Users.string("last_name").notNullable();
      Users.string("email")
        .unique()
        .notNullable();
      Users.string("password").notNullable();
      Users.timestamp("created at").defaultTo(knex.fn.now());
      Users.json("preferences");
    })
    .createTable("tallyweb.businesses", Businesses => {
      Businesses.increments();
      Businesses.string("name").notNullable();
      Businesses.string("city").notNullable();
      Businesses.string("state").notNullable();
    })
    .createTable("tallyweb.users_businesses", UsersBusinesses => {
      UsersBusinesses.increments();
      // Foreign Key - references users
      UsersBusinesses.integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      // Foreign Key - references businesses
      UsersBusinesses.integer("business_id")
        .unsigned()
        .references("id")
        .inTable("businesses")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("yelp", Yelp => {
      Yelp.increments();
      // Foreign Key - references businesses
      Yelp.integer("business_id")
        .unsigned()
        .references("id")
        .inTable("businesses")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      Yelp.string("url")
        .notNullable()
        .unique();
      Yelp.string("yelp_id")
        .notNullable()
        .unique();
      Yelp.string("image_url");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("tallyweb.yelp")
    .dropTableIfExists("tallyweb.users_businesses")
    .dropTableIfExists("tallyweb.businesses")
    .dropTableIfExists("tallyweb.users");
};

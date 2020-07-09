
exports.up = function(knex) {
  return knex.schema
  //creating the users table
  .createTable('tallyweb.users', users => {
    users.increments()
    users.string('first_name').notNullable()
    users.string('last_name').notNullable()
    users.string('email')
      .unique()
      .notNullable()
    users.string('password')
    users.timestamp('created at').defaultTo(knex.fn.now())
    users.json('preferences')
    users.string("type")
    users.string("google_id")
  })

  //creating table for users owned businesses
  .createTable('tallyweb.users_business', biz => {
    biz.increments()
    //foreign key pointing to users table
    biz.integer('user_id')
      .unsigned()
      .references('id').inTable('tallyweb.users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    //foreign key pointing to DS business table
    biz.string('business_id')
      .unsigned()
      .references('business_id').inTable('tallyds.business')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

  })

  //creating table for users selected 'competition' businesses

  .createTable('tallyweb.users_competitors', comp => {
    comp.increments()

    // foreign key pointing to users table
    comp.integer('user_id')
      .unsigned()
      .references('id').inTable('tallyweb.users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    //foreign key pointing to DS business table
      comp.string('business_id')
        .unsigned()
        .references('business_id').inTable('tallyds.business')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })


  //creating googleUsers Table
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

  // creating table for Google users businesses
  .createTable("tallyweb.gUsers_business", gUsersBusiness => {
      gUsersBusiness.increments();
      // Foreign Key - references gUsers Table
      gUsersBusiness.string("gUser_id")
      .unsigned()
      .references("google_id")
      .inTable("gUsers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

      // Foreign Key - pointing to DS business table
      gUsersBusiness.string("business_id")
      .unsigned()
      .references("business_id")
      .inTable("tallyds.business")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  })

  // creating table for Google users 'competition' businesses
  .createTable('tallyweb.gUsers_competitors', gUserComp => {
    gUserComp.increments();

    // Foreign Key - pointing to gUsers table
    gUserComp.integer('gUser_id')
        .unsigned()
        .references("id")
        .inTable("gUsers")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

    // Foreign Key - pointing to DS Table 'businesses'
    gUserComp.string('business_id')
        .unsigned()
        .references("business_id")
        .inTable("tallyds.business")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
})



};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tallyweb.users')
  .dropTableIfExists('tallyweb.users_business')
  .dropTableIfExists('tallyweb.users_competitors')
  .dropTableIfExists('tallyweb.gUsers')
  .dropTableIfExists('tallyweb.gUsers_business')
  .dropTableIfExists('tallyweb.users_competitors')
};

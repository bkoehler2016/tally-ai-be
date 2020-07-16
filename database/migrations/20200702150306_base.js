
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
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tallyweb.users')
  .dropTableIfExists('tallyweb.users_business')
  .dropTableIfExists('tallyweb.users_competitors')
};

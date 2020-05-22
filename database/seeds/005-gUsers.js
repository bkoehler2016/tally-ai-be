
exports.seed = function(knex) {
      return knex('google_users').insert([
        {gUser_id: 1, first_name: 'testing', last_name: 'user', email: 'testing@google.com'},
      ]);
};

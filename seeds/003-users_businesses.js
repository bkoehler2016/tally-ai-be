
exports.seed = function(knex) {
  
  return knex('users_businesses').insert([
        {
          id: 1, user_id: 1, business_id: 1
        },
        {
          id: 2, user_id: 2, business_id: 2
        },
      ]);
};

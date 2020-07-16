
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tallyweb.competitors').del()
    .then(function () {
      // Inserts seed entries
      return knex('tallyweb.users_competitors').insert([
        {user_id: '1', business_id: '0-PyDCXxUXNZR6BI305evQ' },
        {user_id: '2', business_id: '0s0Xthk1JWrBUu74M81Xyg'},
        {user_id: '3', business_id: '0G-0qet57CmMA5qUm6gPFUTpg' },
        {user_id: '4', business_id: '0QzCeORfF8EY34UODWRV9A' }
      ]);
    });
};

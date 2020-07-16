
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tallyweb.users_business').del()
    .then(function () {
      // Inserts seed entries
      return knex('tallyweb.users_business').insert([
        {user_id: '1', business_id: '01Ov9eDxKRY5k6ImMdiWLQ' },
        {user_id: '2', business_id: '079CV1EE5WLdQqVEVYFeHQ'},
        {user_id: '3', business_id: '0G-WFdOu3_KW3mBZJQq5Cg' },
        {user_id: '4', business_id: '0REfMThghIeyT3uaYGpztg' }
      ]);
    });
};

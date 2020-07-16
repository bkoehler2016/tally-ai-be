
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tallyweb.users').del()
    .then(function () {
      // Inserts seed entries
      return knex('tallyweb.users').insert([
        {
          first_name: 'Mr.',
          last_name: 'Smith',
          email: 'wehaveyou@thematrix.com',
          password: 'neoisnottheone',
          preferences: null,
          type: 'tally',
          google_id: null
        },
        {
          first_name: 'Neo',
          last_name: 'Anderson',
          email: 'iamtheone@thematrix.com',
          password: 'smithisaglitch',
          preferences: null,
          type: 'tally',
          google_id: null
        },
        {
          first_name: 'Mary',
          last_name: 'Alice',
          email: 'theoracle@thematrix.com',
          password: 'neosavedusandicauseimbalance',
          preferences: null,
          type: 'tally',
          google_id: null
        },
        {
          first_name: 'Helmut',
          last_name: 'Bakaitis',
          email: 'thearchitect@thematrix.com',
          password: 'ibringorder2chaos',
          preferences: null,
          type: 'tally',
          google_id: null
        }
      ]);
    });
};

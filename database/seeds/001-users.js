
exports.seed = function(knex) {
  
  return knex('users').insert([
    {
      "id": 1, 'first_name': 'PrincessConsuela', 'last_name': 'BananaHammock', 'email': 'phoebe@123.com', 'password': 'lambdarox'
    },
    {
      "id": 2, 'first_name': 'FreddieMercurie', 'last_name': 'BananaHammock', 'email': 'queen@123.com', 'password': 'queen@123'
    },
      ]);
};

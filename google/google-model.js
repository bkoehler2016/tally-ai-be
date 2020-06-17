const db = require('../database/dbConfig');

function findByEmail(email) {
  return db('tallyweb.testing_gUsers')
    .where('email', email)
    .first();
}

async function add(user) {
  const [id] = await db('tallyweb.testing_gUsers').insert(user, 'google_id');
  return findById(id);
}

  module.exports = {
      findByEmail,
      add
  };
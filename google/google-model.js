const db = require('../database/dbConfig');

function findById(google_id) {
  return db('tallyweb.users')
    .where({ google_id })
    .first();
}

function findByEmail(email) {
  return db('tallyweb.users')
    .where('email', email)
    .first();
}

async function add(user) {
  const [google_id] = await db('tallyweb.users').insert(user, 'google_id');
  return findById(google_id);
}

  module.exports = {
      findByEmail,
      findById,
      add
  };
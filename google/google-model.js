const db = require('../database/dbConfig');

function findById(id) {
  return db('tallyweb.gUsers')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('tallyweb.gUsers').insert(user, 'google_id');
  return findById(id);
}

  module.exports = {
      findById,
      add
  };
const db = require('../database/dbConfig');

function find() {
  return db("tallyweb.users").select("id", "first_name", "last_name", "email", "password", "preferences","type");
}

function findBy(filter) {
  return db('tallyweb.users').where(filter);
}



async function add(user) {
  const [id] = await db('tallyweb.users').insert(user, 'id');
  return findById(id);
}function findById(id) {
  return db('tallyweb.users')
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
}

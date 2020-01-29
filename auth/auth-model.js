const db = require('../database/dbConfig');

function find() {
  return db("tallyweb.users").select("id", "first_name", "last_name", "email", "password", "preferences");
}

function findBy(filter) {
  return db('tallyweb.users').where(filter);
}



async function add(user) {
  const [id] = await db('tallyweb.users').insert(user, 'id');
  return findById(id);
}

function findByName(first_name) {
  return db('tallyweb.users')
    .where({
      first_name: first_name
    })
    .select("id", "email", "password", "preferences");
}

function findById(id) {
  return db('tallyweb.users')
    .where({ id })
    .first();
}

function remove(id) {
  return db('tallyweb.users')
    .where({ id })
    .first()
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByName,
  remove
}

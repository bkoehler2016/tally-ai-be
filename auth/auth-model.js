const db = require("./database/dbconfig.js");

module.exports = {
  insert,
  //   addUser,
  find,
  findBy,
  findById
};

// A lot of this will actually be handled in users-model.js

async function insert(user) {
  const [id] = await db("users").insert(user);
//   const added = findById(id);
//   return added;
}

function find() {
  return db("users").select("id", "email", "password", "preferences");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

// async function addUser(user) {
//   const [id] = await db("users").insert(user);
//   const added = findById(id);
//   return added;
// }

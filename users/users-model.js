const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  findByBusinessID,
  insertBusiness,
  update,
  destroy
};

async function getUsers(id) {
  const { business_id, ...rest } = db("users as u")

    .join("users_businesses as ub", "ub.user_id", "=", "u.id")
    .join("businesses as b", "b.id", "=", "ub.business_id")
    .where("u.id", "=", { id });
}

async function findByBusinessID(id) {
  const result = await db.raw(
    `SELECT * FROM users_businesses WHERE id = ${id} `
  );
  return result[0];
}

function insertBusiness(business) {
  return db("user_businesses")
    .insert(business)
    .then(id => {
      return findByBusinessID(id[0]);
    });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function destroy(id) {
  return db("users")
    .where("id", id)
    .del();
}

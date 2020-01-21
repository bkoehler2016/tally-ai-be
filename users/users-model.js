const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  findByBusinessID,
  insertBusiness,
  update,
  destroy
};

function getUsers(id) {
  return db("users as u")
    .join("users_businesses as ub", "ub.user_id", "u.id")
    .join("businesses as b", "b.id", "ub.business_id")
    .join("yelp as y", "y.business_id", "b.id")
    .where({ "u.id": id })
    .select("u.first_name", "u.last_name", "b.id", "b.name", "b.city", "b.state", "y.yelp_id", "y.url", "y.image_url")
    .first();
}

async function findByBusinessID(id) {
  const result = await db.raw(
    `SELECT * FROM businesses WHERE id = ${id} `
  );
  return result[0];
}

async function insertBusiness(business) {
  // Separate yelp data from the rest of the business object
  const { yelp, ...rest } = business;

  // Insert into businesses table
  const [id] = await db('businesses').insert({ ...rest });

  // Insert into yelp table after adding business_id
  const yelp_id = await db('yelp').insert({ ...yelp, business_id: id })

  // Insert into users_businesses table
  await db('users_businesses').insert({ business_id: id, yelp_id })

  return ({ business_id: id, yelp_id });
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

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
    .select("ub.user_id", "u.first_name", "u.last_name", "b.id", "b.name", "b.city", "b.state", "y.yelp_id", "y.url", "y.image_url")
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

  // Check if business already in the DB
  const { yelp_id, business_id } = await db('yelp as y').select('y.id as yelp_id', 'y.business_id as business_id').where({ 'id': business.yelp.yelp_id });

  if (yelp_id) {
    return ({ business_id, yelp_id });
  } else {
    // Insert into businesses table
    const [id] = await db('businesses').insert({ ...rest });

    // Insert into yelp table after adding business_id
    const yelp_id = await db('yelp').insert({ ...yelp, business_id: id })

    // Insert into users_businesses table
    await db('users_businesses').insert({ business_id: id, yelp_id })

    return ({ business_id: id, yelp_id });
  }

}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function destroy(id) {
  // TODO: Also delete entry from users_businesses where user_id: id
  return db("users")
    .where("id", id)
    .del();
}

const db = require("../database/dbConfig");
const knex = require('knex');

module.exports = {
  getUsers,
  findByBusinessID,
  insertBusiness,
  insertFavorite,
  update,
  destroy
};

async function getUsers(id) {
  // try {
  // Get user info
  // const user_info = await db("users as u")
  //   .select("u.id as user_id", "u.first_name", "u.last_name")
  //   .where({ id });

  // // Get business ids
  // // format: [{business_id: 1}, {business_id: 2}];
  // const business_ids = await db("users as u")
  //   .join("users_businesses as ub", "ub.user_id", "u.id")
  //   .where({ "u.id": id })
  //   .select('ub.business_id');
  // console.log("Business ids in getUsers: ", business_ids);

  // // Get Business Info for each business_id and get Yelp info for each business_id
  // const businesses_promises = business_ids.reduce(async (list, biz) => {
  //   try {
  //     const biz_info = await db('businesses as b')
  //       .select("b.id", "b.name", "b.city", "b.state")
  //       .where({ "id": biz.business_id });
  //     const yelp_info = await db('yelp as y')
  //       .select("y.yelp_id", "y.url", "y.image_url")
  //       .where({ "business_id": biz.business_id });
  //     return [...list, { ...biz_info, yelp: yelp_info }];
  //   } catch (error) {
  //     return error;
  //   }
  // });

  // const business = Promise.all(businesses_promises);

  // return ({ ...user_info, businesses });
  // } catch (error) {
  //   return ({ message: "Error getting info for user.", error });
  // }


  // return db('users')
  //   .join("businesses as b", "b.id", "ub.business_id")
  //   .join("yelp as y", "y.business_id", "b.id")
  //   .where({ "u.id": id })
  //   .select(
  //     "ub.user_id",
  //     "u.first_name",
  //     "u.last_name",
  //     //knex.raw('ARRAY_AGG(JSON_OBJECT_AGG(id, b.id, name, b.name, city, b.city, state, b.state)) as businesses'),
  //     "b.id",
  //     "b.name",
  //     "b.city",
  //     "b.state",
  //     "y.yelp_id",
  //     "y.url",
  //     "y.image_url"
  //   )
  //   .first();

  return db("users as u")
    .join("users_businesses as ub", "ub.user_id", "u.id")
    .join("businesses as b", "b.id", "ub.business_id")
    .join("yelp as y", "y.business_id", "b.id")
    .where({ "u.id": id })
    .select("u.id as user_id", "u.first_name", "u.last_name", "b.id as business_id", "b.name", "b.city", "b.state", "y.yelp_id", "y.url", "y.image_url");



  // try {
  //   // Get user info
  //   const user_info = await db("users as u")
  //     .select("u.id as user_id", "u.first_name", "u.last_name")
  //     .where({ id }).first();

  //   // Get business ids
  //   // format: [{business_id: 1}, {business_id: 2}];
  //   const business_ids = await db("users as u")
  //     .join("users_businesses as ub", "ub.user_id", "u.id")
  //     .where({ "u.id": id })
  //     .select('ub.business_id');
  //   console.log("Business ids in getUsers: ", business_ids);

  //   let businesses = [];
  //   let business = {};
  //   let yelp = {};
  //   for (let business_id of business_ids) {
  //     business = await db('businesses as b')
  //       .select("b.id", "b.name", "b.city", "b.state")
  //       .where({ "id": business_id }).first();
  //     yelp = await db('yelp as y')
  //       .select("y.yelp_id", "y.url", "y.image_url")
  //       .where({ "business_id": business_id }).first();
  //     businesses.concat({
  //       ...business,
  //       yelp
  //     });
  //     console.log("Business: ", business);
  //     console.log("Yelp: ", yelp);
  //   }
  //   return ({ ...user_info, businesses });
  // } catch (error) {
  //   return error;
  // }


}

async function findByBusinessID(id) {
  const result = await db.raw(
    `SELECT * FROM businesses WHERE id = ${id} `
  );
  return result[0];
}

async function insertBusiness(business, user_id) {
  // Separate yelp data from the rest of the business object
  const { yelp, ...rest } = business;

  // Check if business already in the DB
  const { yelp_id, business_id } = await db('yelp as y')
    .select('y.id as yelp_id', 'y.business_id as business_id')
    .where({ 'id': business.yelp.yelp_id });

  if (yelp_id) {
    return ({ business_id, yelp_id });
  } else {
    // Insert into businesses table
    const [id] = await db('businesses').insert({ ...rest });

    // Insert into yelp table after adding business_id
    const yelp_id = await db('yelp').insert({ ...yelp, business_id: id })

    // Insert into users_businesses table
    await db('users_businesses').insert({ business_id: id, user_id })

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

// TODO: DELETE BUSINESS
function destroyBusiness(id) {
  return {}
}

// TODO: DELETE FAVORITE
function destroyFavorite(id) {
  return {}
}


async function insertFavorite(business, user_id) {
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
    await db('users_favorites').insert({ business_id: id, user_id })

    return ({ business_id: id, yelp_id });
  }
}
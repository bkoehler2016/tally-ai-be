const db = require("../database/dbConfig");
const knex = require('knex');

module.exports = {
  getUsers,
  getBusinesses,
  getFavorites,
  findByBusinessID,
  insertBusiness,
  insertFavorite,
  update,
  destroy,
  destroyBusiness,
  destroyFavorite
};

async function getUsers(id) {
  // return db("users as u")
  //   .join("users_businesses as ub", "ub.user_id", "u.id")
  //   .join("businesses as b", "b.id", "ub.business_id")
  //   .join("yelp as yb", "yb.business_id", "b.id")
  //   .join("users_favorites as uf", "uf.user_id", "u.id")
  //   .join("businesses as f", "f.id", "uf.business_id")
  //   .join("yelp as yf", "yf.business_id", "f.id")
  //   .where({ "u.id": id })
  //   .select(
  //     // User
  //     "u.id as user_id", "u.first_name", "u.last_name", // users
  //     // Businesses
  //     "b.id as business_id_business", "b.name as name_business", "b.city as city_business", "b.state as state_business", // businesses
  //     "yb.yelp_id as yelp_id_business", "yb.url as url_business", "yb.image_url as image_url_business", // yelp
  //     // Favorites
  //     "f.id as business_id_favorite", "f.name as name_favorite", "f.city as city_favorite", "f.state as state_favorite", // businesses
  //     "yf.yelp_id as yelp_id_favorite", "yf.url as url_favorite", "yf.image_url as image_url_favorite" // yelp
  //   );
  try {
    const user = await getUserInfo(id);
    const businesses = await getBusinesses(id);
    const favorites = await getFavorites(id);
    return ({
      ...user,
      businesses,
      favorites
    })
  } catch (error) {
    return error;
  }
}

function getUserInfo(id) {
  return db("users as u").where({ "u.id": id }).select("*").first();
}

function getBusinesses(id) {
  return db('users as u')
    .join("users_businesses as ub", "ub.user_id", "u.id")
    .join("businesses as b", "b.id", "ub.business_id")
    .join("yelp as yb", "yb.business_id", "b.id")
    .where({ "u.id": id })
    .select(
      "b.id", "b.name", "b.city", "b.state", // businesses
      "yb.yelp_id", "yb.url", "yb.image_url" // yelp
    )
}


function getFavorites(id) {
  return db('users as u')
    .join("users_favorites as uf", "uf.user_id", "u.id")
    .join("businesses as f", "f.id", "uf.business_id")
    .join("yelp as yf", "yf.business_id", "f.id")
    .where({ "u.id": id })
    .select(
      "f.id", "f.name", "f.city", "f.state", // businesses
      "yf.yelp_id", "yf.url", "yf.image_url" // yelp
    )
}

async function findByBusinessID(id) {
  const result = await db.raw(
    `SELECT * FROM businesses WHERE id = ${id} `
  );
  return result[0];
}

async function insertBusiness(business, user_id) {
  // // Separate yelp data from the rest of the business object
  // const { yelp, ...rest } = business;

  // // Check if business already in the DB
  // const { yelp_id, business_id } = await db('yelp as y')
  //   .select('y.id as yelp_id', 'y.business_id as business_id')
  //   .where({ 'id': business.yelp.yelp_id }).first();

  // if (yelp_id) {
  //   return ({ business_id, yelp_id });
  // } else {
  //   // Insert into businesses table
  //   const [id] = await db('businesses').insert({ ...rest });

  //   // Insert into yelp table after adding business_id
  //   const yelp_id = await db('yelp').insert({ ...yelp, business_id: id })

  //   // Insert into users_businesses table
  //   await db('users_businesses').insert({ business_id: id, user_id })

  //   return ({ business_id: id, yelp_id });
  // }


  // Separate yelp data from the rest of the business object
  const { yelp, ...rest } = business;

  // console.log("Yelp: ", yelp);
  console.log("Rest: ", rest);

  // Check if business already in the DB
  try {
    // const biz = await db('yelp as y')
    //   .select('y.id as yelp_id', 'y.business_id as business_id')
    //   .where({ 'y.business_id': test });
    // console.log("Yelp ID in insertFavorite: ", biz.yelp_id);
    const { exists, biz_id } = await businessExists(yelp.yelp_id);
    console.log("Exists: ", exists);
    console.log("biz_id: ", biz_id);
    if (exists) {
      const added = await alreadyAddedBusiness(user_id, biz_id);
      if (added) {
        return { message: "Already added this business." }
      } else {
        try {
          await db('users_businesses').insert({ business_id: biz_id, user_id }, "id")
          return ({ business_id: biz_id, yelp_id: yelp.yelp_id });
        } catch (error) {
          return error;
        }
      }

    } else {
      // Insert into businesses table
      console.log("In else clause");
      const [business_id] = await db('businesses').insert(rest);
      console.log("business_id from insert", business_id);
      // Insert into yelp table after adding business_id
      const [yelp_id] = await db('yelp').insert({ business_id, ...yelp, });
      console.log("yelp_id from insert: ", yelp_id)
      // Insert into users_businesses table
      await db('users_business').insert({ business_id, user_id })

      return ({ business_id, yelp_id });
    }
  } catch (error) {
    console.log("Error inserting business:\n", error);
    return error;
  }
}

function update(id, changes) {
  if (changes.preferences) {
    changes.preferences = JSON.stringify(changes.preferences);
  }
  console.log(`\nChanges in update:\n${changes}\n`);
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
  return db("users_businesses")
    .where("business_id", id)
    .del();
}

// TODO: DELETE FAVORITE
function destroyFavorite(id) {
  return db("users_favorites")
    .where("business_id", id)
    .del();
}


async function insertFavorite(business, user_id) {
  // Separate yelp data from the rest of the business object
  const { yelp, ...rest } = business;

  // console.log("Yelp: ", yelp);
  console.log("Rest: ", rest);

  // Check if business already in the DB
  try {
    // const biz = await db('yelp as y')
    //   .select('y.id as yelp_id', 'y.business_id as business_id')
    //   .where({ 'y.business_id': test });
    // console.log("Yelp ID in insertFavorite: ", biz.yelp_id);
    const { exists, biz_id } = await businessExists(yelp.yelp_id);
    console.log("Exists: ", exists);
    console.log("biz_id: ", biz_id);
    if (exists) {
      const favorited = await alreadyFavorited(user_id, biz_id);
      if (favorited) {
        return { message: "Already favorited." }
      } else {
        try {
          await db('users_favorites').insert({ business_id: biz_id, user_id }, "id")
          return ({ business_id: biz_id, yelp_id: yelp.yelp_id });
        } catch (error) {
          return error;
        }
      }

    } else {
      // Insert into businesses table
      console.log("In else clause");
      const [business_id] = await db('businesses').insert(rest);
      console.log("business_id from insert", business_id);
      // Insert into yelp table after adding business_id
      const [yelp_id] = await db('yelp').insert({ business_id, ...yelp, });
      console.log("yelp_id from insert: ", yelp_id)
      // Insert into users_businesses table
      await db('users_favorites').insert({ business_id, user_id })

      return ({ business_id, yelp_id });
    }
  } catch (error) {
    console.log("Error inserting favorite:\n", error);
    return error;
  }
}

async function businessExists(yelp_id) {
  const yelp = await db('yelp as y')
    .select("y.business_id")
    .where({ 'y.yelp_id': yelp_id });
  console.log("Yelp in businessExists: ", yelp);
  console.log("Yelp length > 0: ", yelp.length > 0);
  // console.log("Yelp[0].business_id: ", yelp[0]);
  return {
    exists: yelp.length > 0,
    biz_id: yelp.length > 0 ? yelp[0].business_id : undefined
  };
}

async function alreadyFavorited(user_id, business_id) {
  const favorited = await db("users_favorites").select("*").where({ user_id, business_id });
  return favorited.length > 0;
}

async function alreadyAddedBusiness(user_id, business_id) {
  const added = await db("users_businesses").select("*").where({ user_id, business_id });
  return added.length > 0;
}
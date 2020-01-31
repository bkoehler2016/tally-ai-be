const db = require("../database/dbConfig");
const knex = require('knex');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers,
  getUserId,
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

function getUserId(filter) {
  return db("tallyweb.users as u").where(filter).select("u.id").first();
}

async function getUsers(id) {
  try {
    const user = await getUserInfo(id);
    if (!user) {
      throw new Error("User not found.");
    }
    console.log("User in users-model:\n", user);
    // const parsedUser = {
    //   ...user, preferences: user.preferences ? JSON.parse(user.preferences) : {}
    // };
    // console.log("parsed user in users-model: ", parsedUser);
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
  return db("tallyweb.users as u").where({ "u.id": id }).select("*").first();
}

function getBusinesses(id) {
  return db('tallyweb.users as u')
    .join("tallyweb.users_businesses as ub", "ub.user_id", "u.id")
    .join("tallyweb.businesses as b", "b.id", "ub.business_id")
    .join("tallyweb.yelp as yb", "yb.business_id", "b.id")
    .where({ "u.id": id })
    .select(
      "b.id", "b.name", "b.city", "b.state", // businesses
      "yb.yelp_id", "yb.url", "yb.image_url" // yelp
    )
}


function getFavorites(id) {
  return db('tallyweb.users as u')
    .join("tallyweb.users_favorites as uf", "uf.user_id", "u.id")
    .join("tallyweb.businesses as f", "f.id", "uf.business_id")
    .join("tallyweb.yelp as yf", "yf.business_id", "f.id")
    .where({ "u.id": id })
    .select(
      "f.id", "f.name", "f.city", "f.state", // businesses
      "yf.yelp_id", "yf.url", "yf.image_url" // yelp
    )
}

async function findByBusinessID(id) {
  const result = await db.raw(
    `SELECT * FROM tallyweb.businesses WHERE id = ${id} `
  );
  return result[0];
}

async function insertBusiness(business, user_id) {
  // Separate yelp data from the rest of the business object
  const { yelp, ...rest } = business;

  // Check if business already in the DB
  try {
    const { exists, biz_id } = await businessExists(yelp.yelp_id);
    console.log("Business exists? ", exists);
    console.log("biz_id: ", biz_id);
    if (exists) {
      const added = await alreadyAddedBusiness(user_id, biz_id);
      if (added) {
        return { message: "Already added this business." }
      } else {
        try {
          await db('tallyweb.users_businesses').insert({ business_id: biz_id, user_id }, "id")
          return ({ business_id: biz_id, yelp_id: yelp.yelp_id });
        } catch (error) {
          return error;
        }
      }

    } else {
      // Insert into businesses table
      console.log("Adding a new business...");
      const [business_id] = await db('tallyweb.businesses').insert(rest, "id");
      console.log("business_id from insert", business_id);
      // Insert into yelp table after adding business_id
      const [yelp_id] = await db('tallyweb.yelp').insert({ business_id, ...yelp, }, "id");
      console.log("yelp_id from insert: ", yelp_id)
      // Insert into users_businesses table
      await db('tallyweb.users_businesses').insert({ business_id, user_id }, "id")

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
  if (changes.password) {
    changes.password = bcrypt.hashSync(changes.password, 12);
  }
  console.log(`\nChanges in update:\n${changes}\n`);
  return db("tallyweb.users")
    .where({ id })
    .update(changes);
}

function destroy(id) {
  return db("tallyweb.users")
    .where("id", id)
    .del();
}

function destroyBusiness(id) {
  return db("tallyweb.users_businesses")
    .where("business_id", id)
    .del();
}

function destroyFavorite(id) {
  return db("tallyweb.users_favorites")
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
    const { exists, biz_id } = await businessExists(yelp.yelp_id);
    console.log("Exists: ", exists);
    console.log("biz_id: ", biz_id);
    if (exists) {
      const favorited = await alreadyFavorited(user_id, biz_id);
      if (favorited) {
        return { message: "Already favorited." }
      } else {
        try {
          await db('tallyweb.users_favorites').insert({ business_id: biz_id, user_id }, "id")
          return ({ business_id: biz_id, yelp_id: yelp.yelp_id });
        } catch (error) {
          return error;
        }
      }

    } else {
      // Insert into businesses table
      console.log("In else clause");
      const [business_id] = await db('tallyweb.businesses').insert(rest, "id");
      console.log("business_id from insert", business_id);
      // Insert into yelp table after adding business_id
      const [yelp_id] = await db('tallyweb.yelp').insert({ business_id, ...yelp, }, "id");
      console.log("yelp_id from insert: ", yelp_id)
      // Insert into users_businesses table
      await db('tallyweb.users_favorites').insert({ business_id, user_id }, "id")

      return ({ business_id, yelp_id });
    }
  } catch (error) {
    console.log("Error inserting favorite:\n", error);
    return error;
  }
}

async function businessExists(yelp_id) {
  const yelp = await db('tallyweb.yelp as y')
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
  const favorited = await db("tallyweb.users_favorites").select("*").where({ user_id, business_id });
  return favorited.length > 0;
}

async function alreadyAddedBusiness(user_id, business_id) {
  const added = await db("tallyweb.users_businesses").select("*").where({ user_id, business_id });
  return added.length > 0;
}
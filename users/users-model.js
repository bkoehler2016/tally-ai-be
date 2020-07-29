const db = require("../database/dbConfig");
const knex = require('knex');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers,
  getUserId,
  editUser,
  getUserBusinessInfo,
  getUserBusinessCompetitionInfo,
  addUserBusiness,
  addUserCompetition,
  removeUsersBusiness,
  removeUsersCompetition,
  alreadyAddedBusiness,
  alreadyCompetition,
  hashPassword
};

function hashPassword(pw) {
  return bcrypt.hashSync(pw, 12)
}

function getUserId(filter) {
  console.log(filter);
  return db("tallyweb.users as u").where(filter).select("u.id").first();
}

function findById(id) {
  return db('tallyweb.users')
  .where({id})
  .first()
}

function editUser(id, changes) {
  console.log(id);
  console.log(typeof(id))
  console.log(changes)
  console.log(changes.first_name);;
  if(changes.password) {
    const newPass = hashPassword(changes.password)
    changes.password = newPass
    return db('tallyweb.users').update(changes).where({'id': id})
      .then(() =>{
      return findById(id)
    })
  } else {
    return db('tallyweb.users').update(changes).where({'id': id})
      .then(() => {
      return findById(id)
    })
  }
}

async function getUsers(id) {
  try {
    const user = await getUserInfo(id);
    if (!user) {
      throw new Error("User not found.");
    }
    console.log("User in users-model:\n", user);


    const businesses = await getUserBusinessInfo(id);
    const competition = await getUserBusinessCompetitionInfo(id);
    return ({
      ...user,
      businesses,
      competition
    })
  } catch (error) {
    return error;
  }
}



function getUserInfo(id) {
  return db("tallyweb.users as u").where({ "u.id": id }).select("*").first();
}


function getUserBusinessInfo(id) {
  return db('tallyweb.users as u')
    .join("tallyweb.users_business as ub", "ub.user_id", "u.id")
    .join("tallyds.business as f", "ub.business_id", "f.business_id")
    .select(
      "f.business_id", "f.name", "f.address", "f.city", "f.zipcode", 'f.latitude',
      'f.longitude', 'f.cuisine', 'f.review_count', 'f.business_stars')
      .where({ "ub.user_id": id})
}


function getUserBusinessCompetitionInfo(id) {
  return db('tallyweb.users as u')
    .join("tallyweb.users_competitors as ub", "ub.user_id", "u.id")
    .join("tallyds.business as f", "ub.business_id", "f.business_id")
    .select(
      "f.business_id", "f.name", "f.address", "f.city", "f.zipcode", 'f.latitude',
      'f.longitude', 'f.cuisine', 'f.review_count', 'f.business_stars')
      .where({ "ub.user_id": id})
}


async function addUserBusiness(user_id, business_id) {
  await db('tallyweb.users_business').insert({  user_id,  business_id })
  return ({ user_id, business_id });
}

async function addUserCompetition(user_id, business_id) {
  await db('tallyweb.users_competitors').insert ({user_id, business_id})
}




function removeUsersBusiness(id) {
  return db("tallyweb.users_business")
    .where("business_id", id)
    .del();
}

function removeUsersCompetition(id) {
  return db("tallyweb.users_competitors")
    .where("business_id", id)
    .del();
}

async function alreadyCompetition(user_id, business_id) {
  const favorited = await db("tallyweb.users_favorites").select("*").where({ user_id, business_id });
  return favorited.length > 0;
}

async function alreadyAddedBusiness(user_id, business_id) {
  const added = await db("tallyweb.users_business").select("*").where({ user_id, business_id });
  return added.length > 0;
}
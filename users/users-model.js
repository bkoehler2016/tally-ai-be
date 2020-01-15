const db = require('../database/dbConfig')

module.exports

function getUsers() {
    return db('users_businesses')
}

async function findByBusinessID(id){
    const result = await db.raw(`SELECT * FROM users_businesses WHERE id = ${id} `)
    return result[0]
}

function insertBusiness(business) {
    return db('user_businesses')
    .insert(business)
    .then(id => {
        return findByBusinessID(id[0])
    });
}

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes);
}

function destroy(id) {
    return db('users')
    .where('id', id)
    .del();
}

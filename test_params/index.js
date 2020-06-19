const goodRegistration = {
  first_name: "john",
  last_name: "quincy",
  email: "thisisanemail@email.com",
  password: 'testingpassword'

}

const badRegistration = {
  first_name: "john",
  last_name: "quincy",
  email: '',
  password: 'testingpassword'
}


const goodLogin = {
  email: "thisisanemail@email.com",
  password: 'testingpassword'
}

const badLogin = {
  email: 'thisisanemail@email.com',
  password: 'badpass'
}

const biz1 = {
  id: "3",
  name: "Biz1",
  city: "Atlanta",
  state: "GA",
  yelp: {
    yelp_id: "",
    image_url: 'http://wwww.somesite.com'
  }
}

const biz2= {
  id: "4",
  name: "Biz2",
  city: "Las Vegas",
  state: "NV",
  yelp: {
    yelp_id: "",
    image_url: 'http://wwww.somesite.com'
  }
}

const biz3 = {
  id: "5",
  name: "Biz3",
  city: "Atlanta",
  state: "GA",
  yelp: {
    yelp_id: "",
    image_url: 'http://wwww.somesite.com'
  }
}

const changedUser = {
  first_name: 'PrincessConsuela',
  last_name: 'BananaHammock',
  email: 'phoebe@123.com',
  password: 'lambdarox123'
}


module.exports = {
  goodLogin,
  goodRegistration,
  badLogin,
  badRegistration,
  biz1,
  biz2,
  biz3,
  changedUser
}
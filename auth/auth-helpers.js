const jwt = require("jsonwebtoken");
const Users = require("./auth-model");

module.exports = {
    getJwtToken,
    validateUser
};

async function validateUser(user) {
    console.log(user);
    const {first_name, last_name, email, password} = user
    let errors = [];

    // Check for valid password
    if (!user.password || user.password.length < 8) {
        errors = [
            ...errors,
            "Please include a password with at least 8 characters"
        ];
    }

    // Check for valid email
    if (!user.email || !user.email.includes("@") || !user.email.includes(".")) {
        errors = [...errors, "Please include a valid email."];
    }

    // Check to see if email already exists in DB
    const oldUser = await Users.findBy({email});
    const emailExists = oldUser.length > 0;
    console.log(emailExists);
    if (emailExists) {
        errors = [...errors, "An account with the provided email already exists."];
        console.log(errors);
    }

    return {
        isSuccessful: errors.length === 0,
        errors
    };
}

function getJwtToken(email, password) {
    const payload = {
        email,
        password
    };

    const secret = process.env.JWT_SECRET || "make sure it's a secret please";

    const options = {
        expiresIn: "7d"
    };

    return jwt.sign(payload, secret, options);
}

const jwt = require('jsonwebtoken');
const { getUserId } = require('./users-model')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedJwt = jwt.decode(token);
    const { id } = await getUserId({ email: decodedJwt.email });

    if (req.params.id === `${id}`) {
        console.log("Valid");
        next();
    } else {
        console.log("Invalid");
        res.status(401).json({ message: "Not authorized to access this resource." })
    }
}
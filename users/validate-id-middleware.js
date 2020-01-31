const jwt = require('jsonwebtoken');
const { getUserId } = require('./users-model')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedJwt = jwt.decode(token);

    const { id } = await getUserId({ email: decodedJwt.email });

    console.log("User ID: ", typeof id);
    console.log("User ID === req.params.id? ", id === req.params.id)
    console.log("Decoded Token: ", decodedJwt);
    console.log("req.params.id: ", typeof req.params.id);
    if (String(id) === req.params.id) {
        console.log("Valid");
        next();
    } else {
        console.log("Invalid");
        res.status(401).json({ message: "Not authorized to access this resource." })
    }
}
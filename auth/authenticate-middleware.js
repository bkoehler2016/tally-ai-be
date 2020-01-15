const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`\nAuthentication Token Provided:\n${token}\n`);
  console.log(`\nHeaders:\n${req.headers.toString()}\n`);

  if (token) {
    const secret = process.env.JWT_SECRET || "make sure it's a secret please";
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(`\nError authorizing token:\n${err}\n`);
        res.status(401).json({ message: "Permission denied. Invalid credentials." });
      } else {
        req.decodedJwt = decodedToken;
        
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Permission denied. No credentials provided." })
  }
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkJwt = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Not allowed to do this");
  }
  try {
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).send("Not allowed to do this");
  }
};

module.exports = checkJwt;

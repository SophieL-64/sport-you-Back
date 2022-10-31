const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkJwt = (req, res, next) => {
  // console.log("req.headers", req.headers);
  if (!req.headers.authorization) {
    return res.status(401).send("Not allowed to do this");
  }
  try {
    // console.log(
    //   "req.headers.authorization.split()[1]",
    //   req.headers.authorization.split(" ")[1]
    // );
    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).send("Not allowed to do this");
  }
};

module.exports = checkJwt;

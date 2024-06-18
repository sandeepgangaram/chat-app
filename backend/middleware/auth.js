const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.auth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing Token" });
  }

  jwt.verify(token, config.appKey, (error, user) => {
    if (error) {
      return res.status(401).json({ error });
    }

    req.user = user;
  });

  next();
};

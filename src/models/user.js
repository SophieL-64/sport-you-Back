const connection = require("../config/db-config");

const findUserByEmail = (email) => {
  return connection
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);
};
const insertUser = (email, password) => {
  connection
    .promise()
    .query("INSERT INTO users(email, password) VALUES (?, ?)", [
      email,
      password,
    ]);
};

module.exports = { findUserByEmail, insertUser };

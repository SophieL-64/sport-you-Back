const connection = require("../config/db-config");

const findAdminByEmail = (email) => {
  return connection
    .promise()
    .query("SELECT * FROM admins WHERE email = ?", [email]);
};
const insertAdmin = (adminName, email, password) => {
  connection
    .promise()
    .query(
      "INSERT INTO admins(adminName, email, hashedPassword) VALUES (?, ?, ?)",
      [adminName, email, password]
    );
};

module.exports = { findAdminByEmail, insertAdmin };

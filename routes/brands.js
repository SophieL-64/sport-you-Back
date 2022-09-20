const brandsRouter = require("express").Router();
const connection = require("../config/db-config");

brandsRouter.get("/", (req, res) => {
  let sql = "SELECT * from brands;";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = brandsRouter;

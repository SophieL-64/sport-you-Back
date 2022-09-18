const faqsRouter = require("express").Router();
const connection = require("../config/db-config");

faqsRouter.get("/", (req, res) => {
  let sql = "SELECT * FROM faqs";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = faqsRouter;

const formInputsRouter = require("express").Router();
const connection = require("../config/db-config");

formInputsRouter.get("/inputTypes", (req, res) => {
  let sql = "SELECT * FROM formInputsTypes";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

formInputsRouter.get("/opinions", (req, res) => {
  let sql =
    "SELECT f.id, f.firstname, f.rate, f.comment FROM formInputs AS f WHERE formInputsTypes_id=3 AND rate >=4";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

formInputsRouter.post("/", (req, res) => {
  let { firstname, name, email, rate, comment, formInputsTypes_id } = req.body;

  console.log("req.body", req.body);
  connection.query(
    "INSERT INTO formInputs (firstname, name, email, rate, comment, formInputsTypes_id) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, name, email, rate, comment, formInputsTypes_id],

    (err, result) => {
      if (err) {
        res.json({
          status: false,
          message: "there are some error with query",
        });
        console.log("err", err);
      } else {
        console.log("Saved successfully");
        res.json({ success: 1 });
      }
    }
  );
});

module.exports = formInputsRouter;

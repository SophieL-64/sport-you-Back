const feedbacksRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");

// INTERFACE ADMIN
feedbacksRouter.get("/", checkJwt, (req, res) => {
  let sql =
    "SELECT f.*, fb.type AS type, DATEDIFF(NOW(), date) AS published FROM feedbacks AS f JOIN feedbackstypes AS fb ON f.feedbacksTypes_id=fb.id";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// INTERFACE UTILISATEURS
feedbacksRouter.get("/inputTypes", (req, res) => {
  let sql = "SELECT * FROM feedbacksTypes";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// INTERFACE UTILISATEURS
feedbacksRouter.get("/opinions", (req, res) => {
  let sql =
    "SELECT f.id, f.firstname, DATEDIFF(NOW(), f.date) AS published, f.rate, f.comment FROM feedbacks AS f WHERE feedbacksTypes_id=3 AND rate >=4";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// AJOUT DEPUIS INTERFACE UTILISATEURS
feedbacksRouter.post("/", (req, res) => {
  let { firstname, name, email, rate, comment, feedbacksTypes_id } = req.body;

  // console.log("req.body", req.body);
  connection.query(
    "INSERT INTO feedbacks (firstname, name, email, rate, comment, feedbacksTypes_id) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, name, email, rate, comment, feedbacksTypes_id],

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

// DELETE /////////////////////////////////

feedbacksRouter.delete("/:id", checkJwt, async (req, res) => {
  const feedbackId = req.params.id;
  // console.log("feedbackId", feedbackId);

  connection.query(
    "DELETE FROM feedbacks WHERE id = ?",
    [feedbackId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a feedback");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = feedbacksRouter;

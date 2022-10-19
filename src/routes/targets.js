const targetsRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");

// GET POUR PANNEAU ADMIN AdminTargets
targetsRouter.get("/targetsAdmin", checkJwt, (req, res) => {
  let sql = "SELECT * FROM targets";
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
targetsRouter.get("/", (req, res) => {
  let sql = "SELECT * from targets;";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE CIBLES COMMERCIALES DANS INTERFACE ADMIN EDIT
targetsRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM targets WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET targets data");
    } else {
      res.status(200).json(result);
    }
  });
});

// PUT
targetsRouter.put(
  "/:id",
  checkJwt,
  // validatePutColors,
  async (req, res) => {
    const { id } = req.params;
    const targetsPropsToUpdate = req.body;

    connection.query(
      "UPDATE targets SET ? WHERE id = ?",
      [targetsPropsToUpdate, id],
      (err, result) => {
        if (err) {
          res.json({
            status: false,
            message: "there are some error with query",
          });
          console.log(err);
        } else {
          console.log("Saved successfully");
          return res.status(200).json({ success: 1 });
        }
      }
    );
  }
);

// POST
targetsRouter.post(
  "/",
  checkJwt,
  // validatePostClothes,
  (req, res) => {
    // console.log("req.body de targetAdd", req.body);
    const { name } = req.body;

    const sqlAdd = "INSERT INTO targets (name) VALUES (?)";
    connection.query(sqlAdd, [name], (error, result) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "there are some error with query targetsAdd",
        });
        console.log("error", error);
      } else {
        res.status(200).json({ success: 1 });
      }
    });
  }
);

// DELETE /////////////////////////////////

targetsRouter.delete("/:id", checkJwt, async (req, res) => {
  const targetId = req.params.id;
  // console.log("targetId", targetId);

  connection.query(
    "DELETE FROM targets WHERE id = ?",
    [targetId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a target");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = targetsRouter;

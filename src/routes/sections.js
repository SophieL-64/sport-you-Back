const sectionsRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");

// GET POUR PANNEAU ADMIN AdminSections
sectionsRouter.get("/sectionsAdmin", checkJwt, (req, res) => {
  let sql = "SELECT * FROM sections";
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
sectionsRouter.get("/", (req, res) => {
  //Select tte les tables de la BDD//
  let sql = "SELECT * from sections;";
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
sectionsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  //Select tte les tables de la BDD//
  let sql =
    "SELECT c.*, b.logo, b.name AS brand FROM clothes AS c JOIN brands AS b WHERE c.brands_id=b.id AND sections_id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sections data");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE COULEURS DANS INTERFACE ADMIN EDIT
sectionsRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM sections WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sections data");
    } else {
      res.status(200).json(result);
    }
  });
});

// POST
sectionsRouter.post(
  "/",
  checkJwt,
  // validatePostClothes,
  (req, res) => {
    // console.log("req.body de sectionAdd", req.body);
    const { name } = req.body;

    const sqlAdd = "INSERT INTO sections (name) VALUES (?)";
    connection.query(sqlAdd, [name], (error, result) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "there are some error with query sectionsAdd",
        });
        console.log("error", error);
      } else {
        res.status(200).json({ success: 1 });
      }
    });
  }
);

// PUT
sectionsRouter.put(
  "/:id",
  checkJwt,
  // validatePutColors,
  async (req, res) => {
    const { id } = req.params;
    const sectionsPropsToUpdate = req.body;

    connection.query(
      "UPDATE sections SET ? WHERE id = ?",
      [sectionsPropsToUpdate, id],
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

// DELETE /////////////////////////////////

sectionsRouter.delete("/:id", checkJwt, async (req, res) => {
  const sectionId = req.params.id;
  // console.log("sectionId", sectionId);

  connection.query(
    "DELETE FROM sections WHERE id = ?",
    [sectionId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a section");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = sectionsRouter;

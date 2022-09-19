const clothesRouter = require("express").Router();
const connection = require("../config/db-config");
const { upload } = require("../helpers/helpersClothesFile");

// GET POUR PANNEAU ADMIN AdminClothes
clothesRouter.get("/clothesAdmin", (req, res) => {
  let sql =
    "SELECT c.*, b.name AS brand, t.name AS target, s.name AS section FROM clothes  AS c JOIN brands AS b ON c.brands_id=b.id JOIN targets AS t ON c.targets_id=t.id JOIN sections AS s ON c.sections_id=s.id";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE ARTICLES INTERFACE CLIENTS
clothesRouter.get("/", (req, res) => {
  //Select tte les tables de la BDD//
  let sql =
    "SELECT c.*, b.logo, b.name AS brand FROM clothes AS c JOIN brands AS b WHERE c.brands_id=b.id";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE ARTICLES DANS MODAL INTERFACE CLIENTS
clothesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  //Select tte les tables de la BDD//
  let sql =
    "SELECT c.*, b.logo, b.name AS brand FROM clothes AS c JOIN brands AS b WHERE c.brands_id=b.id AND c.id=?";
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
clothesRouter.post(
  "/add",
  upload,
  // validatePostClothes,
  (req, res) => {
    let clothes = {
      name: req.body.name,
      description: req.body.description,
      image: req.files.image[0].filename,
      price: req.body.price,
      sections_id: req.body.sections_id,
      brands_id: req.body.brands_id,
      targets_id: req.body.targets_id,
    };

    const sqlAdd = "INSERT INTO clothes SET ?";
    connection.query(sqlAdd, clothes, (error, results) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "there are some error with query",
        });
        console.log(error);
      } else {
        console.log("Saved successfully");
        res.status(200).json({ success: 1 });
      }
    });
  }
);

module.exports = clothesRouter;

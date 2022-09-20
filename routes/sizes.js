const sizesRouter = require("express").Router();
const connection = require("../config/db-config");

sizesRouter.get("/", (req, res) => {
  let sql = "SELECT * FROM sizes";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sizes data");
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  });
});

// GET POUR AFFICHAGE TAILLES ATTACHEES A UNE CLOTHE DANS INTERFACE ADMIN EDIT
sizesRouter.get("/clotheEdit/:id", (req, res) => {
  const { id } = req.params;
  let sql =
    "SELECT chs.clothes_id, chs.sizes_id FROM clothes_has_sizes AS chs JOIN clothes AS c ON c.id = chs.clothes_id WHERE c.id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sizes data");
    } else {
      res.status(200).json(result);
    }
  });
});

sizesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  let sql =
    "SELECT s.size, s.id FROM sizes AS s JOIN clothes_has_sizes AS chs ON s.id = chs.sizes_id JOIN clothes AS c ON chs.clothes_id = c.id WHERE c.id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sizes data");
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  });
});

module.exports = sizesRouter;

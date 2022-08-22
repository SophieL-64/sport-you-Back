const colorsRouter = require("express").Router();
const connection = require("../config/db-config");

colorsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  let sql =
    "SELECT co.id, co.name AS color, co.image AS colorImage from colors AS co JOIN clothes_has_colors AS chc ON co.id = chc.colors_id JOIN clothes AS cl ON chc.clothes_id = cl.id WHERE cl.id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET colors data");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = colorsRouter;

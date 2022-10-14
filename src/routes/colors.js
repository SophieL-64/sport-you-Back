const colorsRouter = require("express").Router();
const connection = require("../config/db-config");

// GET POUR PANNEAU ADMIN AdminColors
colorsRouter.get("/colorsAdmin", (req, res) => {
  let sql = "SELECT * FROM colors";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

colorsRouter.get("/", (req, res) => {
  let sql = "SELECT * FROM colors";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET colors data");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE COULEURS ATTACHEES A UNE CLOTHE DANS INTERFACE ADMIN EDIT
colorsRouter.get("/clotheEdit/:id", (req, res) => {
  const { id } = req.params;
  let sql =
    "SELECT chc.clothes_id, chc.colors_id FROM clothes_has_colors AS chc JOIN clothes AS c ON c.id = chc.clothes_id WHERE c.id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET colors data");
    } else {
      res.status(200).json(result);
    }
  });
});

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

// DELETE /////////////////////////////////

colorsRouter.delete("/:id", async (req, res) => {
  const colorId = req.params.id;
  console.log("colorId", colorId);

  const [[imageOldPath]] = await connection
    .promise()
    .query("SELECT image FROM colors WHERE id = ? ", [colorId]);
  console.log("imageOldPath.image", imageOldPath.image);
  const oldFile = imageOldPath.image;

  connection.query(
    "DELETE FROM colors WHERE id = ?",
    [colorId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a color");
      } else {
        fs.unlinkSync("./public/images/colors/" + oldFile, (err) => {
          if (err) {
            throw err;
          }
          console.log("Delete File successfully.");
        });
        res.sendStatus(204);
      }
    }
  );
});

module.exports = colorsRouter;
const brandsRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");

// GET POUR PANNEAU ADMIN AdminBrands
brandsRouter.get("/", checkJwt, (req, res) => {
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

// DELETE /////////////////////////////////

brandsRouter.delete("/:id", checkJwt, async (req, res) => {
  const brandId = req.params.id;
  console.log("brandId", brandId);

  const [[imageOldPath]] = await connection
    .promise()
    .query("SELECT image FROM brands WHERE id = ? ", [brandId]);
  console.log("imageOldPath.image", imageOldPath.image);
  const oldFile = imageOldPath.image;

  connection.query(
    "DELETE FROM brands WHERE id = ?",
    [brandId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a brand");
      } else {
        fs.unlinkSync("./public/images/brands/" + oldFile, (err) => {
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

module.exports = brandsRouter;

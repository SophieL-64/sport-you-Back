const clothesRouter = require("express").Router();
const connection = require("../config/db-config");
const { upload } = require("../helpers/helpersClothesFile");
const fs = require("fs");

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

// GET POUR AFFICHAGE ARTICLES DANS INTERFACE ADMIN EDIT
clothesRouter.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM clothes AS c WHERE c.id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sections data");
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
    let {
      name,
      description,
      price,
      sections_id,
      brands_id,
      targets_id,
      sizesAvailables,
      colorsAvailables,
    } = req.body;

    const image = req.files.image[0].filename;

    console.log("req.body de clothesAdd", req.body);
    console.log("image clothesAdd", image);

    const sqlAdd =
      "INSERT INTO clothes(name, description, image, price, sections_id, brands_id, targets_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sqlAdd,
      [name, description, image, price, sections_id, brands_id, targets_id],
      (error, result) => {
        if (error) {
          res.status(500).json({
            status: false,
            message:
              "there are some error with query clothesAdd before jointures",
          });
          console.log(error);
        } else {
          const id = result.insertId;
          let sizesJ = [];
          sizesAvailables = sizesAvailables.split(",");
          for (let i = 0; i < sizesAvailables.length; i++) {
            sizesJ.push([id, sizesAvailables[i]]);
            console.log("sizesJ", sizesJ);
          }
          connection.query(
            "INSERT INTO clothes_has_sizes(clothes_id, sizes_id) VALUES ?",
            [sizesJ],
            (err, result) => {
              if (err) {
                console.log("erreur au niveau de la jointure Sizes", err);
                res.status(500).json({
                  status: false,
                  message:
                    "there are some error with query clothesAdd au niveau de la jointure Sizes",
                });
                return;
              } else {
                let colorsJ = [];
                colorsAvailables = colorsAvailables.split(",");
                for (let i = 0; i < colorsAvailables.length; i++) {
                  colorsJ.push([id, colorsAvailables[i]]);
                  console.log("colorsJ", colorsJ);
                }
                connection.query(
                  "INSERT INTO clothes_has_colors(clothes_id, colors_id) VALUES ?",
                  [colorsJ],
                  (err, result) => {
                    if (err) {
                      console.log(
                        "erreur au niveau de la jointure Colors",
                        err
                      );
                      res.status(500).json({
                        status: false,
                        message:
                          "there are some error with query clothesAdd au niveau de la jointure Colors",
                      });
                      return;
                    } else {
                      res.status(200).json({ success: 1 });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

// PUT
clothesRouter.put(
  "/edit/:id",
  upload,
  // validatePostClothes,
  async (req, res) => {
    const { id } = req.params;
    const sqlPut = "UPDATE clothes SET ? WHERE id = ?";
    const clothes = { ...req.body };
    console.log("clothes", clothes);
    delete clothes.cepage;
    let {
      name,
      description,
      price,
      sections_id,
      brands_id,
      targets_id,
      sizesAvailables,
      colorsAvailables,
    } = req.body;

    const image = req.files.image[0].filename;

    console.log("req.body de clothesAdd", req.body);
    console.log("image clothesAdd", image);

    const sqlAdd =
      "INSERT INTO clothes(name, description, image, price, sections_id, brands_id, targets_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sqlAdd,
      [name, description, image, price, sections_id, brands_id, targets_id],
      (error, result) => {
        if (error) {
          res.status(500).json({
            status: false,
            message:
              "there are some error with query clothesAdd before jointures",
          });
          console.log(error);
        } else {
          const id = result.insertId;
          let sizesJ = [];
          sizesAvailables = sizesAvailables.split(",");
          for (let i = 0; i < sizesAvailables.length; i++) {
            sizesJ.push([id, sizesAvailables[i]]);
            console.log("sizesJ", sizesJ);
          }
          connection.query(
            "INSERT INTO clothes_has_sizes(clothes_id, sizes_id) VALUES ?",
            [sizesJ],
            (err, result) => {
              if (err) {
                console.log("erreur au niveau de la jointure Sizes", err);
                res.status(500).json({
                  status: false,
                  message:
                    "there are some error with query clothesAdd au niveau de la jointure Sizes",
                });
                return;
              } else {
                let colorsJ = [];
                colorsAvailables = colorsAvailables.split(",");
                for (let i = 0; i < colorsAvailables.length; i++) {
                  colorsJ.push([id, colorsAvailables[i]]);
                  console.log("colorsJ", colorsJ);
                }
                connection.query(
                  "INSERT INTO clothes_has_colors(clothes_id, colors_id) VALUES ?",
                  [colorsJ],
                  (err, result) => {
                    if (err) {
                      console.log(
                        "erreur au niveau de la jointure Colors",
                        err
                      );
                      res.status(500).json({
                        status: false,
                        message:
                          "there are some error with query clothesAdd au niveau de la jointure Colors",
                      });
                      return;
                    } else {
                      res.status(200).json({ success: 1 });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

// DELETE (incluant tables de jointure Sizes & colors) /////////////////////////////////

clothesRouter.delete("/:id", async (req, res) => {
  const clotheId = req.params.id;
  console.log("clotheId", clotheId);

  const [[imageOldPath]] = await connection
    .promise()
    .query("SELECT image FROM clothes WHERE id = ? ", [clotheId]);
  console.log("imageOldPath.image", imageOldPath.image);
  const oldFile = imageOldPath.image;

  connection.query(
    "DELETE chc FROM clothes_has_colors AS chc JOIN clothes AS c ON c.id = chc.clothes_id  WHERE c.id = ?",
    [clotheId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting data in clothes_has_colors");
      } else {
        connection.query(
          "DELETE chs FROM clothes_has_sizes AS chs JOIN clothes AS c ON c.id = chs.clothes_id  WHERE c.id = ?",
          [clotheId],
          (err, result) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send("😱 Error deleting data in clothes_has_sizes");
            } else {
              connection.query(
                "DELETE FROM clothes WHERE id = ?",
                [clotheId],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("😱 Error deleting a clothe");
                  } else {
                    fs.unlinkSync(
                      "./public/images/clothes/" + oldFile,
                      (err) => {
                        if (err) {
                          throw err;
                        }
                        console.log("Delete File successfully.");
                      }
                    );
                    res.sendStatus(204);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = clothesRouter;

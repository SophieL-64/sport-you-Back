const clothesRouter = require("express").Router();
const connection = require("../config/db-config");
const { upload } = require("../helpers/helpersClothesFile");
const checkJwt = require("../middlewares/checkJwt");
const fs = require("fs");

// GET POUR PANNEAU ADMIN AdminClothes
clothesRouter.get("/clothesAdmin", checkJwt, (req, res) => {
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
clothesRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM clothes WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET clothes data");
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
  "/",
  checkJwt,
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

    // console.log("req.body de clothesAdd", req.body);
    // console.log("image clothesAdd", image);

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
          console.log("error", error);
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
  "/:id",
  checkJwt,
  upload,
  // validatePostClothes,
  async (req, res) => {
    const { id } = req.params;
    const sqlPut = "UPDATE clothes SET ? WHERE id = ?";
    const clothes = { ...req.body };
    // console.log("clothes", clothes);
    delete clothes.sizesAvailables;
    delete clothes.colorsAvailables;
    let sizesAvailables = req.body.sizesAvailables.split(",");
    let colorsAvailables = req.body.colorsAvailables.split(",");
    const lesUpdates = Object.entries(clothes).concat(
      Object.entries(req.files)
    );

    for (const entry of lesUpdates) {
      clothes[entry[0]] =
        typeof entry[1] !== "string" ? entry[1][0].filename : entry[1];
    }

    const [[imagePUTOldPath]] = await connection
      .promise()
      .query("SELECT image FROM clothes WHERE id = ? ", [id]);
    const oldPUTFile = imagePUTOldPath.image;

    if (sizesAvailables.length) {
      console.log("else", typeof sizesAvailables);
      connection.query(
        "DELETE FROM clothes_has_sizes WHERE clothes_id = ?",
        [id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "there are some error with query about sizesAvailables",
            });
          } else {
            let sizes = [];
            console.log("sizesAvailables", sizesAvailables);
            for (i = 0; i < sizesAvailables.length; i++) {
              sizes.push([id, sizesAvailables[i]]);
            }
            console.log("sizes après boucle", sizes);
            connection.query(
              "INSERT INTO `clothes_has_sizes`(`clothes_id`, `sizes_id`) VALUES ?;",
              [sizes],
              (err, result) => {
                if (err) {
                  console.log("erreur après sizes", err);
                  return res.status(500).send("Error saving the clothe");
                }
              }
            );
          }
        }
      );
    }

    if (colorsAvailables.length) {
      // console.log("else", typeof colorsAvailables);
      connection.query(
        "DELETE FROM clothes_has_colors WHERE clothes_id = ?",
        [id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "there are some error with query about colorsAvailables",
            });
          } else {
            let colors = [];
            console.log("colorsAvailables", colorsAvailables);
            for (i = 0; i < colorsAvailables.length; i++) {
              colors.push([id, colorsAvailables[i]]);
            }
            console.log("colors après boucle", colors);
            connection.query(
              "INSERT INTO `clothes_has_colors`(`clothes_id`, `colors_id`) VALUES ?;",
              [colors],
              (err, result) => {
                if (err) {
                  console.log("erreur après colors", err);
                  return res.status(500).send("Error saving the clothe");
                }
              }
            );
          }
        }
      );
    }

    if (Object.keys(clothes).length) {
      connection.query(sqlPut, [clothes, id], (error, result) => {
        if (error) {
          console.log("error dans object.keys du PUT", error);
          return res.json({
            status: false,
            message:
              "there are some error with query about other than sizes and colors",
          });
        } else {
          if (clothes.image) {
            console.log("fs.unlink se joue CAS1");
            fs.unlink("./public/images/clothes/" + oldPUTFile, (err) => {
              if (err) {
                throw err;
              }
              console.log("Delete File successfully.");
            });
          }
          return res.status(200).json({ success: 1 });
        }
      });
    } else {
      return res.status(200).json({ success: 1 });
    }
  }
);

// DELETE (incluant tables de jointure Sizes & colors) /////////////////////////////////

clothesRouter.delete("/:id", checkJwt, async (req, res) => {
  const clotheId = req.params.id;
  // console.log("clotheId", clotheId);

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
        console.log("err", err);
        res.status(500).send("😱 Error deleting data in clothes_has_colors");
      } else {
        connection.query(
          "DELETE chs FROM clothes_has_sizes AS chs JOIN clothes AS c ON c.id = chs.clothes_id  WHERE c.id = ?",
          [clotheId],
          (err, result) => {
            if (err) {
              console.log("err", err);
              res
                .status(500)
                .send("😱 Error deleting data in clothes_has_sizes");
            } else {
              connection.query(
                "DELETE FROM clothes WHERE id = ?",
                [clotheId],
                (err, result) => {
                  if (err) {
                    console.log("err", err);
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

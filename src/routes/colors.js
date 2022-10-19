const colorsRouter = require("express").Router();
const connection = require("../config/db-config");
const { upload } = require("../helpers/helpersColorsFile");
const checkJwt = require("../middlewares/checkJwt");
const fs = require("fs");

// GET POUR PANNEAU ADMIN AdminColors
colorsRouter.get("/colorsAdmin", checkJwt, (req, res) => {
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

// INTERFACE UTILISATEURS
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
colorsRouter.get("/clotheEdit/:id", checkJwt, (req, res) => {
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

// GET POUR AFFICHAGE COULEURS DANS INTERFACE ADMIN EDIT
colorsRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM colors WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET colors data");
    } else {
      res.status(200).json(result);
    }
  });
});

// INTERFACE UTILISATEURS
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

// POST
colorsRouter.post(
  "/",
  checkJwt,
  upload,
  // validatePostColors,
  (req, res) => {
    let { name } = req.body;
    const image = req.files.image[0].filename;

    // console.log("req.body de colorsAdd", req.body);
    // console.log("image colorsAdd", image);

    const sqlAdd = "INSERT INTO colors(name, image) VALUES (?, ?)";
    connection.query(sqlAdd, [name, image], (error, result) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "there are some error with query colorsAdd",
        });
        console.log("error", error);
      } else {
        res.status(200).json({ success: 1 });
      }
    });
  }
);

// PUT
colorsRouter.put(
  "/:id",
  checkJwt,
  upload,
  // validatePutColors,
  async (req, res) => {
    const { id } = req.params;
    const sqlPut = "UPDATE colors SET ? WHERE id = ?";
    const colors = { ...req.body };
    console.log("colors", colors);

    const lesUpdates = Object.entries(colors).concat(Object.entries(req.files));

    for (const entry of lesUpdates) {
      colors[entry[0]] =
        typeof entry[1] !== "string" ? entry[1][0].filename : entry[1];
    }

    const [[imagePUTOldPath]] = await connection
      .promise()
      .query("SELECT image FROM colors WHERE id = ? ", [id]);
    console.log("imagePUTOldPath.image", imagePUTOldPath.image);
    const oldPUTFile = imagePUTOldPath.image;

    if (Object.keys(colors).length) {
      connection.query(sqlPut, [colors, id], (error, result) => {
        if (error) {
          console.log("error dans object.keys du PUT", error);
          return res.json({
            status: false,
            message: "there are some error with query",
          });
        } else {
          if (colors.image) {
            console.log("fs.unlink se joue CAS1");
            fs.unlink("./public/images/colors/" + oldPUTFile, (err) => {
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

// DELETE /////////////////////////////////

colorsRouter.delete("/:id", checkJwt, async (req, res) => {
  const colorId = req.params.id;
  // console.log("colorId", colorId);

  const [[imageOldPath]] = await connection
    .promise()
    .query("SELECT image FROM colors WHERE id = ? ", [colorId]);
  console.log("imageOldPath.image", imageOldPath?.image);
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

const brandsRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");
const { upload } = require("../helpers/helpersBrandsFile");
const {
  validateBrandsPost,
  validateBrandsPut,
} = require("../middlewares/validators/validatorBrands");
const fs = require("fs");

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

// GET POUR AFFICHAGE MARQUES DANS INTERFACE ADMIN EDIT
brandsRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM brands WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET brands data");
    } else {
      res.status(200).json(result);
    }
  });
});

// POST
brandsRouter.post("/", checkJwt, upload, validateBrandsPost, (req, res) => {
  let { name, country } = req.body;
  const image = req.files.logo[0].filename;

  // console.log("req.body de brandsAdd", req.body);
  // console.log("image brandsAdd", image);

  const sqlAdd = "INSERT INTO brands(name, logo, country) VALUES (?, ?, ?)";
  connection.query(sqlAdd, [name, image, country], (error, result) => {
    if (error) {
      res.status(500).json({
        status: false,
        message: "there are some error with query brandsAdd",
      });
      console.log("error", error);
    } else {
      res.status(200).json({ success: 1 });
    }
  });
});

// PUT
brandsRouter.put(
  "/:id",
  checkJwt,
  upload,
  validateBrandsPut,
  async (req, res) => {
    const { id } = req.params;
    const sqlPut = "UPDATE brands SET ? WHERE id = ?";
    const brands = { ...req.body };
    console.log("brands", brands);

    const lesUpdates = Object.entries(brands).concat(Object.entries(req.files));

    for (const entry of lesUpdates) {
      brands[entry[0]] =
        typeof entry[1] !== "string" ? entry[1][0].filename : entry[1];
    }

    const [[imagePUTOldPath]] = await connection
      .promise()
      .query("SELECT logo FROM brands WHERE id = ? ", [id]);
    console.log("imagePUTOldPath.logo", imagePUTOldPath.logo);
    const oldPUTFile = imagePUTOldPath.logo;

    if (Object.keys(brands).length) {
      connection.query(sqlPut, [brands, id], (error, result) => {
        if (error) {
          console.log("error dans object.keys du PUT", error);
          return res.json({
            status: false,
            message: "there are some error with query",
          });
        } else {
          console.log("brands.logo", brands.logo);
          if (brands.logo) {
            console.log("fs.unlink se joue CAS1");
            fs.unlink("./public/images/brands/" + oldPUTFile, (err) => {
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

brandsRouter.delete("/:id", checkJwt, async (req, res) => {
  const brandId = req.params.id;
  // console.log("brandId", brandId);

  const [[imageOldPath]] = await connection
    .promise()
    .query("SELECT logo FROM brands WHERE id = ? ", [brandId]);
  // console.log("imageOldPath.image", imageOldPath.logo);
  const oldFile = imageOldPath.logo;

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

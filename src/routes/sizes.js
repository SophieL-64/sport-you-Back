const sizesRouter = require("express").Router();
const connection = require("../config/db-config");

// GET POUR PANNEAU ADMIN AdminSizes
sizesRouter.get("/sizesAdmin", (req, res) => {
  let sql = "SELECT * FROM sizes";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

sizesRouter.get("/", (req, res) => {
  let sql = "SELECT * FROM sizes";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET sizes data");
    } else {
      res.status(200).json(result);
      console.log("result", result);
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

// POST
sizesRouter.post(
  "/",
  // validatePostClothes,
  (req, res) => {
    console.log("req.body de sizeAdd", req.body);
    const { size } = req.body;

    const sqlAdd = "INSERT INTO sizes (size) VALUES (?)";
    connection.query(sqlAdd, [size], (error, result) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "there are some error with query sizesAdd",
        });
        console.log("error", error);
      } else {
        res.status(200).json({ success: 1 });
      }
    });
  }
);

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
      console.log("result", result);
    }
  });
});

// DELETE /////////////////////////////////

sizesRouter.delete("/:id", async (req, res) => {
  const sizeId = req.params.id;
  console.log("sizeId", sizeId);

  connection.query(
    "DELETE FROM sizes WHERE id = ?",
    [sizeId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting a size");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = sizesRouter;

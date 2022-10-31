const faqsRouter = require("express").Router();
const connection = require("../config/db-config");
const checkJwt = require("../middlewares/checkJwt");
const {
  validateFaqsPost,
  validateFaqsPut,
} = require("../middlewares/validators/validatorFaqs");

// GET POUR PANNEAU ADMIN Adminfaqs
faqsRouter.get("/faqsAdmin", checkJwt, (req, res) => {
  let sql = "SELECT * FROM faqs";
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
faqsRouter.get("/", (req, res) => {
  let sql = "SELECT * from faqs;";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// GET POUR AFFICHAGE CIBLES COMMERCIALES DANS INTERFACE ADMIN EDIT
faqsRouter.get("/edit/:id", checkJwt, (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM faqs WHERE id=?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error requesting GET faqs data");
    } else {
      res.status(200).json(result);
    }
  });
});

// POST
faqsRouter.post("/", checkJwt, validateFaqsPost, (req, res) => {
  // console.log("req.body de faqAdd", req.body);
  const { question, answer } = req.body;

  const sqlAdd = "INSERT INTO faqs (question, answer) VALUES (?, ?)";
  connection.query(sqlAdd, [question, answer], (error, result) => {
    if (error) {
      res.status(500).json({
        status: false,
        message: "there are some error with query faqsAdd",
      });
      console.log("error", error);
    } else {
      res.status(200).json({ success: 1 });
    }
  });
});

// PUT
faqsRouter.put("/:id", checkJwt, validateFaqsPut, async (req, res) => {
  const { id } = req.params;
  const faqsPropsToUpdate = req.body;

  connection.query(
    "UPDATE faqs SET ? WHERE id = ?",
    [faqsPropsToUpdate, id],
    (err, result) => {
      if (err) {
        res.json({
          status: false,
          message: "there are some error with query",
        });
        console.log(err);
      } else {
        console.log("Saved successfully");
        return res.status(200).json({ success: 1 });
      }
    }
  );
});

// DELETE /////////////////////////////////

faqsRouter.delete("/:id", checkJwt, async (req, res) => {
  const faqId = req.params.id;
  // console.log("faqId", faqId);

  connection.query("DELETE FROM faqs WHERE id = ?", [faqId], (err, result) => {
    if (err) {
      console.log("err", err);
      res.status(500).send("😱 Error deleting a faq");
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = faqsRouter;

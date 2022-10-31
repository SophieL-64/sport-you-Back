const adminsRouter = require("express").Router();
const connection = require("../config/db-config");
const argon2 = require("argon2");

const { findAdminByEmail, insertAdmin } = require("../models/admin");
const checkJwt = require("../middlewares/checkJwt");
const { generateJwt } = require("../utils/auth");
const {
  validateAdminLogging,
  validateAdminRegistering,
} = require("../middlewares/validators/validatorAdmins");

// INTERFACE ADMIN
adminsRouter.get("/", checkJwt, (req, res) => {
  connection.query("SELECT * from admins", (err, result) => {
    if (err) {
      return res.status(500).send("Error retrieving admins from database");
    } else {
      return res.status(200).json(result);
    }
  });
});

// POUR CREER UN NOUVEAU COMPTE ADMIN (NECESSAIRE D'ETRE DEJA LOGGE SUR UN COMPTE ADMIN)
adminsRouter.post("/", checkJwt, validateAdminRegistering, async (req, res) => {
  const [[existingAdmin]] = await findAdminByEmail(req.body.email);

  if (existingAdmin) {
    return res
      .status(409)
      .json({ success: 1, message: "L'utilisateur est déjà existant en BDD" });
  }

  const hashedPassword = await argon2.hash(req.body.password);
  await insertAdmin(req.body.adminName, req.body.email, hashedPassword);
  return res.status(201).json({
    success: 2,
  });
});

// POUR SE LOGGER EN TEMPS QU'ADMIN
adminsRouter.post("/login", validateAdminLogging, async (req, res) => {
  const [[existingAdmin]] = await findAdminByEmail(req.body.email);

  if (!existingAdmin) {
    return res
      .status(403)
      .json({ success: 0, message: "L'utilisateur n'existe pas" });
  }
  // console.log("existingAdmin.hashedPassword", existingAdmin.hashedPassword);
  // console.log("req.body.password", req.body.password);

  const verified = await argon2.verify(
    existingAdmin.hashedPassword,
    req.body.password
  );
  if (!verified) {
    return res.status(403).json({
      success: 1,
      message:
        "Le mot de passe ne correspond pas à celui de l'utilisateur renseigné",
    });
  }
  const jwtKey = generateJwt(req.body.email);
  return res.status(201).json({
    success: 2,
    credentials: jwtKey,
  });
});

// DELETE /////////////////////////////////

adminsRouter.delete("/:id", checkJwt, async (req, res) => {
  const adminId = req.params.id;
  // console.log("adminId", adminId);

  connection.query(
    "DELETE FROM admins WHERE id = ?",
    [adminId],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("😱 Error deleting an admin");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = adminsRouter;

const usersRouter = require("express").Router();
const connection = require("../config/db-config");
const argon2 = require("argon2");

const { findUserByEmail, insertUser } = require("../models/user");
const checkJwt = require("../middlewares/checkJwt");
const { generateJwt } = require("../utils/auth");
const { validateUser } = require("../middlewares/validators/validatorUser");

usersRouter.get("/", checkJwt, (req, res) => {
  connection.query("SELECT * from users", (err, result) => {
    if (err) {
      return res.status(500).send("Error retrieving users from database");
    } else {
      return res.status(200).json(result);
    }
  });
});

usersRouter.get("/:id", (req, res) => {
  const { userId } = req.params;
  connection.query(
    "SELECT * from users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error retrieving user from database");
      } else {
        if (results.length) res.status(200).json(results[0]);
        else res.status(404).send("User not found");
      }
    }
  );
});

usersRouter.post("/", validateUser, async (req, res) => {
  const [[existingUser]] = await findUserByEmail(req.body.email);

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "L'utilisateur est déjà existant en BDD" });
  }

  const hashedPassword = await argon2.hash(req.body.password);
  await insertUser(req.body.email, hashedPassword);
});

usersRouter.post("/login", validateUser, async (req, res) => {
  const [[existingUser]] = await findUserByEmail(req.body.email);

  if (!existingUser) {
    return res
      .status(403)
      .json({ success: 0, message: "L'utilisateur n'existe pas" });
  }

  const verified = await argon2.verify(
    existingUser.password,
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

module.exports = usersRouter;

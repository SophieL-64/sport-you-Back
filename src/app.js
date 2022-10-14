const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT_SERVER || 5000;

const connection = require("./config/db-config");

// routesRouter --> requiert le chemin d'accès
const clothesRouter = require("./routes/clothes");
const sectionsRouter = require("./routes/sections");
const colorsRouter = require("./routes/colors");
const sizesRouter = require("./routes/sizes");
const brandsRouter = require("./routes/brands");
const targetsRouter = require("./routes/targets");
const faqsRouter = require("./routes/faqs");
const formInputsRouter = require("./routes/formInputs");
const usersRouter = require("./routes/users");

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// utiliser le middleware express.static pour rendre possible l'accès aux fichiers de ce dossier via HTTP
app.use(express.static("public"));

// Routes
app.use("/clothes", clothesRouter);
app.use("/sections", sectionsRouter);
app.use("/colors", colorsRouter);
app.use("/sizes", sizesRouter);
app.use("/brands", brandsRouter);
app.use("/targets", targetsRouter);
app.use("/faqs", faqsRouter);
app.use("/formInputs", formInputsRouter);
app.use("/users", usersRouter);

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

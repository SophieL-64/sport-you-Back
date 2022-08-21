const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const morgan = require("morgan");

const port = process.env.PORT_SERVER || 5000;

const connection = require("./config/db-config");

// routesRouter --> requiert le chemin d'accès
const clothesRouter = require("./routes/clothes");
const sectionsRouter = require("./routes/sections");
const colorsRouter = require("./routes/colors");
const sizesRouter = require("./routes/sizes");

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

// Routes
app.use("/clothes", clothesRouter);
app.use("/sections", sectionsRouter);
app.use("/colors", colorsRouter);
app.use("/sizes", sizesRouter);

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

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const express = require("express");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");

const Joi = require("joi");

// app.use(express.json());

const app = express();
app.set("view engine", "pug");
app.set("Views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled...");
}

dbDebugger("Connected your database");
//middleware routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use(logger);
app.use("/api/courses", courses);
app.use("/", home);

//middleware routes

//Configuration

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

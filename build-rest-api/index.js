const express = require("express");
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const Joi = require("joi");
const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

// app.use(express.json());

const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

//middleware routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use(logger);

//middleware routes

//Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//post /api/courses
app.use(express.json());
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//update course

app.put("/api/courses/:id", (req, res) => {
  //Look up the courses
  //if not exist, return 404
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course) return res.status(404).send(`Course not found`);
  //validate
  const { error } = validateCourse(req.body);
  //if valid, return 400 - bad request
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  //return the updated course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

//delete request
app.delete("/api/courses/:id", (req, res) => {
  //Look up the courses
  //if not exist, return 404
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course) return res.status(404).send(`Course not found`);
  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//get by id
app.get("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(404).send("Course not found");
  }
  res.send(course);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];
router.app.get("/", (req, res) => {
  res.send(courses);
});

//post /api/courses
router.app.use(express.json());
router.app.post("/", (req, res) => {
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

router.app.put("/:id", (req, res) => {
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
router.app.delete("/:id", (req, res) => {
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
router.app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(404).send("Course not found");
  }
  res.send(course);
});

module.exports = router;

const express = require("express");

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

// app.use(express.json());
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//post /api/courses
app.use(express.json());
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
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
